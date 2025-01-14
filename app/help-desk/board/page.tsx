'use client';

import { Ticket, ticketSchema } from '../config/schema/ticket';
import { PageBoard } from '@headless-adminapp/fluent/PageBoard';
import { RecordItem } from './RecordItem';
import { defineBoardConfig } from '@headless-adminapp/app/board/utils';

const config = defineBoardConfig({
  title: 'Ticket board',
  description: 'Drag and drop to change status',
  schema: ticketSchema,
  sorting: [
    {
      field: 'created_at',
      order: 'desc',
    },
  ],
  projection: {
    columns: [
      'subject',
      'created_at',
      'updated_at',
      'status',
      'customer_id',
      'agent_id',
      'product_id',
      'messages',
      'category',
    ],
    expand: {
      agent_id: ['avatar'],
      customer_id: ['avatar'],
    },
  },
  PreviewComponent: RecordItem,
  columnConfigs: [
    {
      columnId: 'open',
      title: 'Open',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'status',
            operator: 'eq',
            value: 'open',
          },
        ],
      },
      acceptSourceIds: ['in_progress', 'resolved'],
      updateFn: async (context) => {
        try {
          context.utility.showProgressIndicator();
          await context.dataService.updateRecord(
            context.primaryControl.logicalName,
            context.primaryControl.id,
            {
              status: 'open',
            }
          );
          context.queryClient.invalidateQueries({
            queryKey: [
              'data',
              'retriveRecords',
              context.primaryControl.logicalName,
            ],
          });
        } finally {
          context.utility.hideProgressIndicator();
        }
      },
    },
    {
      columnId: 'in_progress',
      title: 'In Progress',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'status',
            operator: 'eq',
            value: 'in_progress',
          },
        ],
      },
      acceptSourceIds: ['open', 'resolved'],
      updateFn: async (context) => {
        try {
          context.utility.showProgressIndicator();

          const record = await context.dataService.retriveRecord<Ticket>(
            context.primaryControl.logicalName,
            context.primaryControl.id,
            ['status', 'agent_id']
          );

          if (!record.agent_id) {
            const result = await context.utility.openPromptDialog({
              attributes: {
                agent_id: ticketSchema.attributes.agent_id,
              },
              defaultValues: {},
              title: 'Assign Agent',
            });

            if (!result) {
              return;
            }

            await context.dataService.updateRecord(
              context.primaryControl.logicalName,
              context.primaryControl.id,
              {
                ...result,
              }
            );
          }

          await context.dataService.updateRecord(
            context.primaryControl.logicalName,
            context.primaryControl.id,
            {
              status: 'in_progress',
            }
          );
          context.queryClient.invalidateQueries({
            queryKey: [
              'data',
              'retriveRecords',
              context.primaryControl.logicalName,
            ],
          });
        } finally {
          context.utility.hideProgressIndicator();
        }
      },
    },
    {
      columnId: 'resolved',
      title: 'Resolved',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'status',
            operator: 'eq',
            value: 'resolved',
          },
        ],
      },
      acceptSourceIds: ['open', 'in_progress'],
      updateFn: async (context) => {
        try {
          context.utility.showProgressIndicator();
          await context.dataService.updateRecord(
            context.primaryControl.logicalName,
            context.primaryControl.id,
            {
              status: 'resolved',
            }
          );
          context.queryClient.invalidateQueries({
            queryKey: [
              'data',
              'retriveRecords',
              context.primaryControl.logicalName,
            ],
          });
        } finally {
          context.utility.hideProgressIndicator();
        }
      },
    },
  ],
});

export default function Page() {
  return <PageBoard config={config} />;
}
