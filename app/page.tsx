"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

export default function Home() {
  const [enigma, setEnigma] = useState("");
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [tentativasErradas, setTentativasErradas] = useState<string[]>([]);
  const [numTentativas, setNumTentativas] = useState(0);
  const MAX_TENTATIVAS = 3;

  useEffect(() => {
    fetch("/api/enigma")
      .then((res) => res.json())
      .then((data) => setEnigma(data.texto));
  }, []);

  const verificarResposta = async () => {
    if (resposta.trim() === "") return;

    const res = await fetch("/api/enigma");
    const data = await res.json();

    setNumTentativas(numTentativas + 1);

    if (resposta.trim().toLowerCase() === data.resposta.trim().toLowerCase()) {
      setFeedback("✅ Você acertou!");
      setTentativasErradas([]);
      setNumTentativas(0);
    } else {
      if (!tentativasErradas.includes(resposta.trim())) {
        setTentativasErradas([...tentativasErradas, resposta.trim()]);
      }

      if (numTentativas >= MAX_TENTATIVAS - 1) {
        setFeedback(`❌ Errou! A resposta era: ${data.resposta}`);
      }
    }

    setResposta("");
  };

  return (
    <Flex
      maxW="xl"
      mx="auto"
      p={6}
      mt={"20vh"}
      flexDir={"column"}
      bgColor={"#fff"}
    >
      <Heading as="h1" size="xl" mb={4}>
        🧠 Enigma do Dia
      </Heading>
      <Text fontSize="lg" mb={6}>
        {enigma || "Carregando..."}
      </Text>

      <Text textAlign={"right"} mr={"5px"}>
        Tentativas : {numTentativas} / {MAX_TENTATIVAS}
      </Text>

      <Input
        placeholder="Sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        mb={4}
        pl={"6px"}
        size="lg"
        fontSize="xl"
        borderWidth="2px"
        borderRadius="lg"
        bgColor={"#c2bcbc"}
        _hover={{ borderColor: "blue.400", border: "3px solid #3182ce" }}
        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            verificarResposta();
          }
        }}
        disabled={
          numTentativas >= MAX_TENTATIVAS && feedback.includes("A resposta era")
        }
      />
      <Button
        colorScheme="blue"
        onClick={verificarResposta}
        size="lg"
        fontSize="xl"
        width="100%"
        py={6}
        disabled={
          numTentativas >= MAX_TENTATIVAS && feedback.includes("A resposta era")
        }
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        transition="all 0.2s"
      >
        Verificar
      </Button>

      {feedback && <Text mt={"10px"}>{feedback}</Text>}

      {tentativasErradas.length > 0 && (
        <Flex flexDirection={"column"} mt={"15px"}>
          {tentativasErradas.map((tentativa, index) => (
            <Text key={index}>❌ {tentativa}</Text>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
