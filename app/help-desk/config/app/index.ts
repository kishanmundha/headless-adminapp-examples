import { AppExperience } from '@headless-adminapp/core/experience/app';
import { navPageSections } from './navigations';
import { commands } from '../commands';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { GithubIcon } from '@/app/icons/Github';
import { LIB_REF_HIDDEN } from '@/app/env';

const SettingsIcon = bundleLazyIcon('Settings24Regular', 'Settings24Filled');
const AlertIcon = bundleLazyIcon('Alert24Regular', 'Alert24Filled');
const SearchIcon = bundleLazyIcon('Search24Regular', 'Search24Filled');

export const appExperience: AppExperience = {
  id: 'default',
  logo: {
    image: 'https://cdn-icons-png.flaticon.com/512/5537/5537993.png',
  },
  title: 'Help Desk',
  navItems: navPageSections,
  accountMenuItems: [],
  quickActionItems: [
    {
      type: 'icon',
      label: 'Search',
      icon: SearchIcon,
    },
    {
      type: 'icon',
      label: 'Notification',
      icon: AlertIcon,
    },
    {
      type: 'icon',
      label: 'Settings',
      icon: SettingsIcon,
    },
  ],
  viewCommands: commands.view,
  formCommands: commands.form,
  subgridCommands: commands.subgrid,
};

if (!LIB_REF_HIDDEN) {
  appExperience.quickActionItems?.push({
    type: 'icon',
    label: 'Github',
    icon: GithubIcon,
    // link: 'https://github.com/kishanmundha/headless-adminapp-examples',
    onClick: () => {
      window.open(
        'https://github.com/kishanmundha/headless-adminapp-examples',
        '_blank'
      );
    },
  });
}
