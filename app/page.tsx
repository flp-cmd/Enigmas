"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

export default function Home() {
  const [enigma, setEnigma] = useState("");
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("/api/enigma")
      .then((res) => res.json())
      .then((data) => setEnigma(data.texto));
  }, []);

  const verificarResposta = async () => {
    const res = await fetch("/api/enigma");
    const data = await res.json();

    if (resposta.trim().toLowerCase() === data.resposta.trim().toLowerCase()) {
      setFeedback("✅ Você acertou!");
    } else {
      setFeedback(`❌ Errou! A resposta era: ${data.resposta}`);
    }
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
      />
      <Button
        colorScheme="blue"
        onClick={verificarResposta}
        size="lg"
        fontSize="xl"
        width="100%"
        py={6}
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        transition="all 0.2s"
      >
        Verificar
      </Button>

      {feedback && (
        <Text mt={4} fontSize="lg">
          {feedback}
        </Text>
      )}
    </Flex>
  );
}
