import { RecordItem } from './RecordItem';
import { defineBoardConfig } from '@headless-adminapp/app/board/utils';
import { dealSchema } from '@/app/sales-hub/config/schema/deal';
import { ItemUpdateContext } from '@headless-adminapp/app/board/types';
import { defineQuickFilter } from '@headless-adminapp/core/experience/view/QuickFilter';
import { Condition, Filter } from '@headless-adminapp/core/transport';

const statusTransitions: Record<string, string[]> = {
  ['opportunity']: ['proposal', 'negotiation'],
  ['proposal']: ['negotiation', 'won', 'lost'],
  ['negotiation']: ['proposal', 'won', 'lost'],
  ['won']: [],
  ['lost']: [],
};

export function handleStatusUpdate(status: string) {
  return async function (context: ItemUpdateContext) {
    try {
      context.utility.showProgressIndicator();
      await context.dataService.updateRecord(
        context.primaryControl.logicalName,
        context.primaryControl.id,
        {
          status,
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
  };
}

export function getAcceptSourceIds(
  status: string,
  statusTransitions: Record<string, string[]>
) {
  return Object.keys(statusTransitions).filter((key) =>
    statusTransitions[key]?.includes(status)
  );
}

export const config = defineBoardConfig({
  title: 'Deals',
  description: 'Drag and drop to change stage',
  schema: dealSchema,
  sorting: [
    {
      field: 'createdAt',
      order: 'desc',
    },
  ],
  projection: {
    columns: [
      'title',
      'stage',
      'amount',
      'category',
      'companyid',
      'salesownerid',
    ],
  },
  PreviewComponent: RecordItem,
  columnConfigs: [
    {
      columnId: 'opportunity',
      title: 'Opportunity',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'stage',
            operator: 'eq',
            value: 'opportunity',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('opportunity', statusTransitions),
      updateFn: handleStatusUpdate('opportunity'),
    },
    {
      columnId: 'proposal',
      title: 'Proposal',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'stage',
            operator: 'eq',
            value: 'proposal',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('proposal', statusTransitions),
      updateFn: handleStatusUpdate('proposal'),
    },
    {
      columnId: 'negotiation',
      title: 'Negotiation',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'stage',
            operator: 'eq',
            value: 'negotiation',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('negotiation', statusTransitions),
      updateFn: handleStatusUpdate('negotiation'),
    },
    {
      columnId: 'won',
      title: 'Won',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'stage',
            operator: 'eq',
            value: 'won',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('won', statusTransitions),
      updateFn: handleStatusUpdate('won'),
    },
    {
      columnId: 'lost',
      title: 'Lost',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'stage',
            operator: 'eq',
            value: 'lost',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('lost', statusTransitions),
      updateFn: handleStatusUpdate('lost'),
    },
  ],
  quickFilter: defineQuickFilter({
    attributes: {
      owner: {
        type: 'choice',
        label: 'Owner',
        string: true,
        options: [
          {
            label: 'My Deals',
            value: 'me',
          },
          {
            label: 'All Deals',
            value: 'all',
          },
        ],
      },
      category: {
        type: 'choices',
        label: 'Category',
        string: true,
        options: dealSchema.attributes.category.options,
      },
    },
    defaultValues: {
      owner: 'all',
      category: null,
    },
    resolver: (values, auth) => {
      const conditions: Condition[] = [];

      if (values.category?.length) {
        conditions.push({
          field: 'category',
          operator: 'in',
          value: values.category,
        });
      }

      if (values.owner === 'me') {
        conditions.push({
          field: 'salesownerid',
          operator: 'eq',
          value: auth?.id,
        });
      }

      if (!conditions.length) {
        return null;
      }

      return {
        type: 'and',
        conditions,
      } as Filter;
    },
  }),
});
