import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageGroupAreas } from './navigations';
import { commands } from '../commands';

export const defaultApp: AppExperience = {
  id: 'default',
  logo: {},
  title: 'Sales Hub',
  navItems: navPageGroupAreas,
  accountMenuItems: [],
  quickActionItems: [],
  viewCommands: commands.view,
  formCommands: commands.form,
  subgridCommands: commands.subgrid,
};
