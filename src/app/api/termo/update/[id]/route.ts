import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { termoAceito } = await request.json();
    const session = await getServerSession(auth);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/aceitar/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`
        },
        body: JSON.stringify({
          termo: termoAceito
        })
      }
    );

    const res = await req.json();

    if (!req.ok) {
      return NextResponse.json(
        { message: res.message },
        { status: res.statusCode }
      );
    }

    return NextResponse.json(
      { ...res, message: "Termo atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Erro ao atualizar o termo, erro: " + error.message   },
      { status: 500 }
    );
  }
}
