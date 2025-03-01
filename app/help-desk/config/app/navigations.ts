import {
  NavPageGroupArea,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { EntityName } from '../enums';

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
            logicalName: EntityName.Ticket,
          },
          {
            type: PageType.EntityView,
            logicalName: EntityName.Customer,
          },
          {
            type: PageType.EntityView,
            logicalName: EntityName.Product,
          },
        ],
      },
    ],
  },
];
