import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageGroupAreas } from './navigations';
import { commands } from '../commands';

export const appExperience: AppExperience = {
  id: 'default',
  logo: {},
  title: 'Service Booking',
  navItems: navPageGroupAreas,
  accountMenuItems: [],
  quickActionItems: [],
  viewCommands: commands.view,
  formCommands: commands.form,
  subgridCommands: commands.subgrid,
};
