import { HttpError } from '@headless-adminapp/core/transport';
import { NextRequest, NextResponse } from 'next/server';
import { ExecuteParams, IServerSdk } from '@headless-adminapp/server-sdk';
import { SequelizeServerSdk } from '@headless-adminapp/server-sdk-sequelize';
import { schemaStore } from '@/app/sales-hub/config/server/schemaStore';
import { sequelize } from '../../sequelize';
import { CustomActionFn } from './types';
import { customActionDealsWonLost } from './insights/customActionDealsWonLost';
import { customActionDealPipeline } from './insights/deal-pipeline';
import { customActionDealsByCategory } from './insights/deals-by-category';

const customActions: Record<string, CustomActionFn> = {
  'insights:deals-won-lost': customActionDealsWonLost,
  'insights:deal-pipeline': customActionDealPipeline,
  'insights:deals-by-category': customActionDealsByCategory,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === 'customAction') {
      const customAction = customActions[body.payload.actionName];

      if (customAction) {
        return NextResponse.json(await customAction(body.payload.payload));
      }

      return NextResponse.json(
        {
          error: 'Custom action not found',
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
