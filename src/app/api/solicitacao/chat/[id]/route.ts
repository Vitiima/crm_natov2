import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const req = await request.json();
    console.log("🚀 ~ req:", req);

    const session = await GetSessionServer();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/chat/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(req),
      }
    );

    if (!user.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const data = await user.json();
    console.log("🚀 ~ data:", data);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
