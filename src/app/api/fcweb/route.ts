import { GetSessionServer } from "@/lib/auth_confg";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const User = process.env.USER_API;
        const Pass = process.env.PASS_API;
        const session = await GetSessionServer();

        const credentials = Buffer
            .from(`${User}:${Pass}`, "utf-8")
            .toString("base64");


    
        console.log(credentials)
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const response = await fetch(
            `https://apifcweb.redebrasilrp.com.br/fcweb/import`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${credentials}`,
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Strapi error:", text);
            return new NextResponse(
                `Erro ao criar o registro: ${text}`,
                { status: response.status }
            );
        }

        const retorno = await response.json();
        return NextResponse.json(
            {
                message: "FC criado com sucesso",
                data: { response: retorno },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(error.message, { status: error.status || 500 });
    }
}
