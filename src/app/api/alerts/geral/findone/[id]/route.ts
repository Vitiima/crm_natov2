import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await GetSessionServer();
    if (!session)
    {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = params.id;

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/system-message/${id}`;
    const get = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });
    const data = await get.json();

    if (!get.ok)
      return NextResponse.json(
        { message: data.message },
        { status: get.status }
      );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message.join("\n") || error.message }, { status: 500 });
  }
}