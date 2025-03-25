import { defineBoardConfig } from '@headless-adminapp/app/board/utils';
import { configBase } from '../../config/config';
import { getAcceptSourceIds, handleStatusUpdate } from '../../config/utils';

const statusTransitions: Record<string, string[]> = {
  ['offered']: ['offer-accepted', 'offer-rejected', 'on-hold'],
  ['offer-accepted']: ['hired', 'offer-rejected'],
  ['on-hold']: ['offered'],
};

export const config = defineBoardConfig({
  ...configBase,
  columnConfigs: [
    {
      columnId: 'offered',
      title: 'Offered',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'archived',
            operator: 'eq',
            value: 'false',
          },
          {
            field: 'status',
            operator: 'eq',
            value: 'offered',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('offered', statusTransitions),
      updateFn: handleStatusUpdate('offered'),
    },
    {
      columnId: 'offer-accepted',
      title: 'Offer Accepted',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'archived',
            operator: 'eq',
            value: 'false',
          },
          {
            field: 'status',
            operator: 'eq',
            value: 'offer-accepted',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('offer-accepted', statusTransitions),
      updateFn: handleStatusUpdate('offer-accepted'),
    },
    {
      columnId: 'offer-rejected',
      title: 'Offer Rejected',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'archived',
            operator: 'eq',
            value: 'false',
          },
          {
            field: 'status',
            operator: 'eq',
            value: 'offer-rejected',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('offer-rejected', statusTransitions),
      updateFn: handleStatusUpdate('offer-rejected'),
    },
    {
      columnId: 'hired',
      title: 'Hired',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'archived',
            operator: 'eq',
            value: 'false',
          },
          {
            field: 'status',
            operator: 'eq',
            value: 'hired',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('hired', statusTransitions),
      updateFn: handleStatusUpdate('hired'),
    },
    {
      columnId: 'on-hold',
      title: 'On Hold',
      filter: {
        type: 'and',
        conditions: [
          {
            field: 'archived',
            operator: 'eq',
            value: 'false',
          },
          {
            field: 'status',
            operator: 'eq',
            value: 'on-hold',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('on-hold', statusTransitions),
      updateFn: handleStatusUpdate('on-hold'),
    },
  ],
});
