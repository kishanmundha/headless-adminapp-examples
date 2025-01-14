import { ClientAppStore } from '@headless-adminapp/app/store';
import { defaultApp } from './apps';

export const appStore = new ClientAppStore();

appStore.register(defaultApp);
