import {
  NavPageSection,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { EntityName } from '../enums';

const BoardIcon = bundleLazyIcon('Board24Regular', 'Board24Filled');

export const navPageSections: NavPageSection[] = [
  {
    label: 'Data',
    hideLabel: true,
    items: [
      {
        type: PageType.Custom,
        label: 'Board',
        link: '/board',
        Icon: BoardIcon,
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
];
