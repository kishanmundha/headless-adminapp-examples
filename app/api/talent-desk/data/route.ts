import { HttpError } from '@headless-adminapp/core/transport';
import { NextRequest, NextResponse } from 'next/server';
import { ExecuteParams, IServerSdk } from '@headless-adminapp/server-sdk';
import { SequelizeServerSdk } from '@headless-adminapp/server-sdk-sequelize';
import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { sequelize } from '../../sequelize';
import { CustomActionFn } from './types';
import { customActionApplicationPipeline } from './insights/application-pipeline';
import { customActionWeeklyApplications } from './insights/weekly-applications';
import { customActionApplicationsByWeekday } from './insights/applications-by-weekday';
import { customActionApplicationsByExperience } from './insights/applications-by-experience';
import { customActionApplicationsByHour } from './insights/applications-by-hour';

const customActions: Record<string, CustomActionFn> = {
  'insights:application-pipeline': customActionApplicationPipeline,
  'insights:weekly-applications': customActionWeeklyApplications,
  'insights:applications-by-weekday': customActionApplicationsByWeekday,
  'insights:applications-by-experience': customActionApplicationsByExperience,
  'insights:applications-by-hour': customActionApplicationsByHour,
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
