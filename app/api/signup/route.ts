import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

type Params = {
  phone: string;
  admin?: boolean;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { phone, admin } = body as Params;
  try {
    const ret = await prisma.user.create({
      data: { phone, password: '123456', isAdmin: admin },
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
