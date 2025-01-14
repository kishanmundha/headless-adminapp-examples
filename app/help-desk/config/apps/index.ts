import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageGroupAreas } from './navigations';
import { commands } from '../commands';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const SettingsIcon = bundleLazyIcon('Settings24Regular', 'Settings24Filled');
const AlertIcon = bundleLazyIcon('Alert24Regular', 'Alert24Filled');
const SearchIcon = bundleLazyIcon('Search24Regular', 'Search24Filled');

export const defaultApp: AppExperience = {
  id: 'default',
  logo: {
    image: 'https://cdn-icons-png.flaticon.com/512/5537/5537993.png',
  },
  title: 'Help Desk',
  navItems: navPageGroupAreas,
  accountMenuItems: [],
  quickActionItems: [
    {
      label: 'Search',
      icon: SearchIcon,
    },
    {
      label: 'Notification',
      icon: AlertIcon,
    },
    {
      label: 'Settings',
      icon: SettingsIcon,
    },
  ],
  viewCommands: commands.view,
  formCommands: commands.form,
  subgridCommands: commands.subgrid,
};
