import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageGroupAreas } from './navigations';
import { commands } from '../commands';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { QuickActionNotification } from '@/app/sales-hub/components/QuickActionNotification';

export const defaultApp: AppExperience = {
  id: 'default',
  logo: {
    image: '/icons/sales-hub-white.png',
  },
  title: 'CRM',
  navItems: navPageGroupAreas,
  accountMenuItems: [],
  quickActionItems: [
    {
      type: 'custom',
      Component: QuickActionNotification,
    },
    {
      type: 'icon',
      label: 'Settings',
      icon: iconSet.Settings,
      link: '/settings',
    },
  ],
  viewCommands: commands.view,
  formCommands: commands.form,
  subgridCommands: commands.subgrid,
};
