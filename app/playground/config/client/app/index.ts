import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageSections } from './navigations';

export const appExperience: AppExperience = {
  id: 'default',
  logo: {},
  title: 'Playground',
  navItems: navPageSections,
  accountMenuItems: [],
  quickActionItems: [],
  viewCommands: [],
  formCommands: [],
  subgridCommands: [],
};
