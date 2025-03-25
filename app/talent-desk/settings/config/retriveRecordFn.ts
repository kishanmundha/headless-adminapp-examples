import { RetriveRecordFn } from '@headless-adminapp/app/dataform/DataFormProvider/types';
import { SettingAttributes } from './schema';

export const retriveRecordFn: RetriveRecordFn<SettingAttributes> = async () => {
  return {
    $entity: 'settings',
    $expand: {},
    _id: '1',
    name: 'My Settings',
    notification: false,
  };
};
