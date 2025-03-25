import { defineBoardConfig } from '@headless-adminapp/app/board/utils';
import { configBase } from '../../config/config';
import { getAcceptSourceIds, handleStatusUpdate } from '../../config/utils';

const statusTransitions: Record<string, string[]> = {
  ['received']: ['shortlisted', 'rejected', 'interview-scheduled'],
  ['shortlisted']: ['interview-scheduled', 'rejected'],
  ['interview-scheduled']: [],
  ['offer-accepted']: ['hired', 'offer-rejected'],
};

export const config = defineBoardConfig({
  ...configBase,
  columnConfigs: [
    {
      columnId: 'received',
      title: 'Received',
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
            value: 'received',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('received', statusTransitions),
      updateFn: handleStatusUpdate('received'),
    },
    {
      columnId: 'shortlisted',
      title: 'Shortlisted',
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
            value: 'shortlisted',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('shortlisted', statusTransitions),
      updateFn: handleStatusUpdate('shortlisted'),
    },
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
      columnId: 'rejected',
      title: 'Rejected',
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
            value: 'rejected',
          },
        ],
      },
      acceptSourceIds: getAcceptSourceIds('rejected', statusTransitions),
      updateFn: handleStatusUpdate('rejected'),
    },
  ],
});
