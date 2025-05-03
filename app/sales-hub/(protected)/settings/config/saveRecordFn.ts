import { SaveRecordFn } from '@headless-adminapp/app/dataform/utils/saveRecord';

export const saveRecordFn: SaveRecordFn = async () => {
  return {
    success: true,
    recordId: '1',
  };
};
