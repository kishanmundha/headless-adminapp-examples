import { HttpError } from '@headless-adminapp/core/transport';
import { NextRequest, NextResponse } from 'next/server';
import { ExecuteParams, IServerSdk } from '@headless-adminapp/server-sdk';
import { SequelizeServerSdk } from '@headless-adminapp/server-sdk-sequelize';
import { schemaStore } from '@/app/service-booking/config/server/schemaStore';
import { sequelize } from '../../sequelize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === 'customAction') {
      return NextResponse.json(
        {
          error: 'Custom actions are not supported',
        },
        {
          status: 400,
        }
      );
    }

    // setup and configure sdk
    const sdk: IServerSdk = new SequelizeServerSdk({
      schemaStore,
      sequelize,
    });

    // execute sdk message
    const result = await sdk.execute(body as ExecuteParams);

    return NextResponse.json(result);
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
