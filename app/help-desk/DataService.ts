import { RestDataService } from '@headless-adminapp/app/transport/RestDataService';

export const dataService = new RestDataService({
  endpoint: '/api/help-desk/data',
});
