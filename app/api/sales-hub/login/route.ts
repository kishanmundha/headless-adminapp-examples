import { NextRequest, NextResponse } from 'next/server';
import { BadRequestError } from '@headless-adminapp/core/transport';
import jwt from 'jsonwebtoken';
import { currentUser } from '@/app/mockuser';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = 60 * 60 * 24; // 1 day;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.username || !body.password) {
      throw new BadRequestError('Username and password are required');
    }

    if (body.username !== 'admin' || body.password !== '123') {
      return NextResponse.json({
        success: false,
        error: 'Invalid username or password',
      });
    }

    const token = jwt.sign({ id: currentUser.id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: currentUser.id,
          fullName: currentUser.fullName,
          email: currentUser.email,
        },
      },
      {
        headers: {
          'Set-Cookie': `token=${token}; Path=/; Max-Age=${JWT_EXPIRES_IN}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}
