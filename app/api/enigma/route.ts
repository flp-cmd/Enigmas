import { NextResponse } from 'next/server';

export async function GET() {
  const enigmas = [
    {
      texto: "Quanto mais você tira de mim, maior eu fico. O que sou?",
      resposta: "Buraco",
      data: "2025-04-22"
    },
    {
      texto: "O que tem cabeça, mas não pensa?",
      resposta: "Alho",
      data: "2025-04-23"
    }
  ];

  const hoje = new Date().toISOString().slice(0, 10);
  const enigmaDoDia = enigmas.find(e => e.data === hoje) || enigmas[0];

  return NextResponse.json(enigmaDoDia);
}
