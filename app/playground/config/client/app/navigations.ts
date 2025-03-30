import {
  NavPageSection,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const ControlIcon = bundleLazyIcon(
  'MultiselectLtr24Regular',
  'MultiselectLtr24Filled'
);
export const navPageSections: NavPageSection[] = [
  {
    label: '',
    hideLabel: true,
    items: [
      {
        type: PageType.Custom,
        label: 'Controls',
        link: '/controls',
        Icon: ControlIcon,
      },
    ],
  },
];
