import { HttpError } from '@headless-adminapp/core/transport';
import { NextResponse } from 'next/server';
import { resetData } from './resetData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await resetData();

    return NextResponse.json({
      message: 'Data reset successfully',
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
