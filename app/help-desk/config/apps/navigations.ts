import {
  NavPageGroupArea,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const BoardIcon = bundleLazyIcon('Board24Regular', 'Board24Filled');

export const navPageGroupAreas: NavPageGroupArea[] = [
  {
    label: 'Main',
    groups: [
      {
        label: 'Data',
        hideLabel: true,
        items: [
          {
            type: PageType.Custom,
            label: 'Board',
            link: '/board',
            icon: BoardIcon,
          },
          {
            type: PageType.EntityView,
            logicalName: 'tickets',
          },
          {
            type: PageType.EntityView,
            logicalName: 'customers',
          },
          {
            type: PageType.EntityView,
            logicalName: 'products',
          },
        ],
      },
    ],
  },
];
