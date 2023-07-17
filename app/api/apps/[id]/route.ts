import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

type Params = {
  id: number;
};

type BodyParams = {
  title: string;
  APP_ID: string;
  API_KEY: string;
  description?: string;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { id } = params || {};
  try {
    const ret = await prisma.app.findUnique({
      where: { id },
    });
    if (ret) {
      return NextResponse.json({ ...ret });
    }
    return NextResponse.json({}, { status: 500 });
  } catch (error: any) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const body = await request.json();
  const { id } = params || {};
  const { title, description, APP_ID, API_KEY } = body as BodyParams;
  try {
    const ret = await prisma.app.update({
      data: { title, description, APP_ID, API_KEY },
      where: { id },
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
