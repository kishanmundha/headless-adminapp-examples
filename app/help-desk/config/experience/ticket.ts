import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { ticketSchema } from '../schema/ticket';
import { TicketMessages } from './TicketMessages';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { EntityName } from '../enums';

const TicketIcon = bundleLazyIcon(
  'TicketDiagonal24Regular',
  'TicketDiagonal24Filled'
);

const builder = new SchemaExperienceBuilder(ticketSchema);

const viewExperience = builder.defineViewExperience({
  defaultSorting: [
    {
      field: 'created_at',
      order: 'desc',
    },
  ],
  grid: {
    columns: [
      {
        name: 'subject',
      },
      {
        name: 'customer_id',
      },
      {
        name: 'product_id',
      },
      {
        name: 'created_at',
      },
      // {
      //   name: 'agent_id',
      // },
      {
        name: 'status',
      },
    ],
  },
  card: {
    primaryColumn: 'subject',
    secondaryColumns: [
      { name: 'created_at' },
      { name: 'status', variant: 'choice' },
    ],
  },
});

export const ticketSchemaExperience = builder.defineExperience({
  Icon: TicketIcon,
  defaultViewId: 'default',
  views: [
    {
      id: 'default',
      name: 'All Tickets',
      experience: {
        ...viewExperience,
      },
    },
    {
      id: 'open',
      name: 'Open Tickets',
      experience: {
        ...viewExperience,
        filter: {
          type: 'and',
          conditions: [
            {
              operator: 'eq',
              field: 'status',
              value: 'open',
            },
          ],
        },
      },
    },
    {
      id: 'in_progress',
      name: 'In-Progress Tickets',
      experience: {
        ...viewExperience,
        filter: {
          type: 'and',
          conditions: [
            {
              operator: 'eq',
              field: 'status',
              value: 'in_progress',
            },
          ],
        },
      },
    },
    {
      id: 'resolved',
      name: 'Resolved Tickets',
      experience: {
        ...viewExperience,
        filter: {
          type: 'and',
          conditions: [
            {
              operator: 'eq',
              field: 'status',
              value: 'resolved',
            },
          ],
        },
      },
    },
  ],
  lookups: [
    {
      id: 'default',
      name: 'Default',
      experience: viewExperience,
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience({
        headerControls: ['status', 'created_at', 'updated_at'],
        tabs: [
          {
            columnCount: 2,
            name: 'general',
            label: 'General',
            tabColumns: [
              {
                sections: [
                  {
                    name: 'general',
                    label: 'General',
                    controls: [
                      {
                        type: 'standard',
                        attributeName: 'subject',
                      },
                      {
                        type: 'standard',
                        attributeName: 'customer_id',
                      },
                      {
                        type: 'standard',
                        attributeName: 'product_id',
                      },
                      {
                        type: 'standard',
                        attributeName: 'status',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    name: 'messages',
                    label: 'Messages',
                    hideLabel: true,
                    noPadding: true,
                    controls: [
                      {
                        type: 'subgrid',
                        logicalName: EntityName.Message,
                        associatedAttribute: 'ticket_id',
                        viewId: 'default',
                        component: TicketMessages,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        processFlow: {
          getSteps: (context) => {
            const activatedFlagMapping: Record<string, string[]> = {
              open: ['open'],
              in_progress: ['open', 'in_progress'],
              resolved: ['open', 'in_progress', 'resolved'],
            };

            if (!context.primaryControl.recordId) {
              return null;
            }

            const status = context.primaryControl.originalData
              ?.status as string;

            if (!status) {
              return null;
            }

            return [
              {
                label: 'Open',
                isActivated: activatedFlagMapping[status]?.includes('open'),
              },
              {
                label: 'In Progress',
                isActivated:
                  activatedFlagMapping[status]?.includes('in_progress'),
              },
              {
                label: 'Resolved',
                isActivated: activatedFlagMapping[status]?.includes('resolved'),
              },
            ];
          },
        },
      }),
    },
  ],
});
