import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cpf: string } }
) {
  try {
    const { cpf } = params;
    console.log("🚀 ~ cpf:", cpf);
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/get-infos/checkcpf/${cpf}`
    );
    const response = await data.json();
    console.log("🚀 ~ response:", response);
    if (!data.ok) {
      return NextResponse.json(
        { message: response.message, cpf: true, solicitacoes: [] },
        { status: 500 }
      );
    }
    if (response.length <= 0) {
      return NextResponse.json(
        {
          message: "Você pode prosseguir com o cadastro.",
          cpf: false,
          solicitacoes: [],
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: response.message, cpf: true, solicitacoes: response },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
