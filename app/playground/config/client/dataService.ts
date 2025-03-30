/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDataService } from '@headless-adminapp/core/transport';

export const dataService: IDataService = {
  createRecord: async () => {
    throw new Error('Not implemented');
  },
  deleteRecord: async () => {
    throw new Error('Not implemented');
  },
  customAction: async () => {
    throw new Error('Not implemented');
  },
  retriveAggregate: async () => {
    throw new Error('Not implemented');
  },
  retriveRecord: async () => {
    throw new Error('Not implemented');
  },
  retriveRecords: async () => {
    return {
      count: 2,
      logicalName: 'users',
      records: [
        {
          $entity: 'users',
          _id: '1',
          name: 'John Doe',
        },
        {
          $entity: 'users',
          _id: '2',
          name: 'Alice Smith',
        },
      ],
    } as any;
  },
  updateRecord: async () => {
    throw new Error('Not implemented');
  },
};
