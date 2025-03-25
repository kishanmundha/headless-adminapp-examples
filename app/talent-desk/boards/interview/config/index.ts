import { defineBoardConfig } from '@headless-adminapp/app/board/utils';
import { configBase } from '../../config/config';
import { getAcceptSourceIds, handleStatusUpdate } from '../../config/utils';

const statusTransitions: Record<string, string[]> = {
  ['interview-scheduled']: [
    'interview-completed',
    'interview-rejected',
    'on-hold',
  ],
  ['interview-completed']: ['offered', 'interview-rejected', 'on-hold'],
  ['offered']: [],
  ['on-hold']: ['interview-scheduled', 'interview-rejected', 'offered'],
};

export const config = defineBoardConfig({
  ...configBase,
  columnConfigs: [
    {
      columnId: 'interview-scheduled',
      title: 'Interview Scheduled',
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
            value: 'interview-scheduled',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds(
        'interview-scheduled',
        statusTransitions
      ),
      updateFn: handleStatusUpdate('interview-scheduled'),
    },
    {
      columnId: 'interview-completed',
      title: 'Interview Completed',
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
            value: 'interview-completed',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds(
        'interview-completed',
        statusTransitions
      ),
      updateFn: handleStatusUpdate('interview-completed'),
    },
    {
      columnId: 'interview-rejected',
      title: 'Interview Rejected',
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
            value: 'interview-rejected',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds(
        'interview-rejected',
        statusTransitions
      ),
      updateFn: handleStatusUpdate('interview-rejected'),
    },
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
