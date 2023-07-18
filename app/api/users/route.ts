import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

type Params = {
  page: number;
  page_size: number;
};

type BodyParams = {
  name?: string;
  phone: string;
  isAdmin?: boolean;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { page = 0, page_size = 100 } = params || {};
  try {
    const count = await prisma.user.count();
    const ret = await prisma.user.findMany({
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
  const { name, phone, isAdmin } = body as BodyParams;
  try {
    const username = name || phone;
    const ret = await prisma.user.create({
      data: {
        phone,
        isAdmin,
        name: username,
        password: '123456',
        image: `https://ui-avatars.com/api/?background=1abc9c&rounded=true&name=${username}&color=fff`,
      },
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
