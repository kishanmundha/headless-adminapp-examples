import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageSections } from './navigations';
import { commands } from '../commands';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { QuickActionNotification } from '../../../components/QuickActionNotification';

const ProfileIcon = bundleLazyIcon('Person24Regular', 'Person24Filled');

export const appExperience: AppExperience = {
  id: 'default',
  logo: {},
  title: 'Talent Desk',
  navItems: navPageSections,
  accountMenuItems: [
    {
      label: 'Profile',
      link: '/profile',
      icon: ProfileIcon,
    },
  ],
  quickActionItems: [
    {
      type: 'icon',
      label: 'Search',
      icon: iconSet.Search,
      link: '/search',
    },
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
