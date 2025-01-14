import { HttpError } from '@headless-adminapp/core/transport';
import { NextResponse } from 'next/server';
import { resetMockData } from '../data/mockdata/generator';

export async function GET() {
  try {
    await resetMockData();

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
