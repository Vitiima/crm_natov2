import { GetSessionServer } from "@/lib/auth_confg";
// src/app/api/suporte/upload/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log("🚀 ~ POST ~ formData:", formData);

    const session = await GetSessionServer();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const retornoArquivo = await response.json();

    if (!response.ok) {
      return NextResponse.json(retornoArquivo, { status: 500 });
    }

    return NextResponse.json(
      { data: retornoArquivo, message: "Arquivo enviado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao enviar o arquivo:", error);
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
