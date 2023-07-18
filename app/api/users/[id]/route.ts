import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

type Params = {
  id: string;
};

type BodyParams = {
  name?: string;
  phone: string;
  isAdmin?: boolean;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { id } = params || {};
  try {
    const ret = await prisma.user.findUnique({
      where: { id: parseInt(id) },
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
  const { name, phone, isAdmin } = body as BodyParams;
  try {
    const ret = await prisma.user.update({
      data: { name, phone, isAdmin },
      where: { id: parseInt(id) },
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
