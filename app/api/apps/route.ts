import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

type Params = {
  page: number;
  page_size: number;
};

type BodyParams = {
  title: string;
  APP_ID: string;
  API_KEY: string;
  description?: string;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { page = 0, page_size = 10 } = params || {};
  try {
    const count = await prisma.app.count();
    const ret = await prisma.app.findMany({
      skip: page * page_size,
      take: page_size,
    });
    if (ret) {
      return NextResponse.json({ list: ret, page: page + 1, count });
    }
    return NextResponse.json({}, { status: 500 });
  } catch (error: any) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, APP_ID, API_KEY } = body as BodyParams;
  try {
    const ret = await prisma.app.create({
      data: { title, description, APP_ID, API_KEY },
    });
    if (ret) {
      return NextResponse.json({ id: ret.id });
    }
    return NextResponse.json({}, { status: 500 });
  } catch (error: any) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 },
    );
  }
}
