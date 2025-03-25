import { HttpError } from '@headless-adminapp/core/transport';
import { NextResponse } from 'next/server';
import { currentUser } from '@/app/mockuser';

export async function GET() {
  try {
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
