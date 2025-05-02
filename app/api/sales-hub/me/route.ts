import {
  HttpError,
  UnauthorizedError,
} from '@headless-adminapp/core/transport';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/app/mockuser';
import Jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    const authInfo = getAuthTokenInfo(getTokenFromRequest(req));

    if (!authInfo) {
      throw new UnauthorizedError('Unauthorized');
    }

    return NextResponse.json({
      id: currentUser.id,
      email: currentUser.email,
      exp: Date.now() + 1000 * 60 * 60 * 24,
      fullName: currentUser.fullName,
      profilePicture: currentUser.avatar,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: error.status,
        }
      );
    } else {
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
}

export interface AuthTokenInfo {
  id: string;
  iat: number;
  exp: number;
  locale?: string;
  timezone?: string;
}

function getAuthTokenInfo(
  token: string | undefined | null
): AuthTokenInfo | null {
  if (!JWT_SECRET) {
    return null;
  }

  if (!token) {
    return null;
  }

  let decoded: Jwt.JwtPayload | undefined;
  try {
    decoded = Jwt.verify(token, JWT_SECRET) as Jwt.JwtPayload;
  } catch {
    //
  }

  if (!decoded?.exp) {
    return null;
  }

  return decoded as AuthTokenInfo;
}

function getTokenFromRequest(req: NextRequest): string | null {
  if (req.headers.get('authorization')) {
    const authorization = req.headers.get('authorization');

    if (authorization?.startsWith('Bearer ')) {
      return authorization.substring(7);
    }
  }

  if (req.cookies.get('token')) {
    const token = req.cookies.get('token');

    if (typeof token?.value === 'string') {
      return token.value;
    }
  }

  return null;
}
