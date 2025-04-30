import { NextResponse } from 'next/server';
import { GetSessionServer } from '@/lib/auth_confg';

export async function GET(req: Request) {
  try {
    const session = await GetSessionServer();
    if (!session) return NextResponse.json('Unauthorized', { status: 401 });

    const { searchParams } = new URL(req.url);
    const upstream = new URL(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/direto`
    );
    upstream.search = searchParams.toString();

    const resp = await fetch(upstream.toString(), {
      headers: { Authorization: `Bearer ${session.token}` },
      cache: 'no-store',
    });

    if (!resp.ok) {
      return NextResponse.json('Upstream error', { status: resp.status });
    }
    const payload = await resp.json();
    return NextResponse.json(
      {
        data: payload,        
        total: payload.length,
        page: Number(searchParams.get('pagina') ?? 1),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json('Internal error', { status: 500 });
  }
}
