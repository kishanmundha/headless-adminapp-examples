import { iconSet } from '@headless-adminapp/icons-fluent';
import {
  NavPageSection,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { EntityName } from '../../enums';

export const navPageSections: NavPageSection[] = [
  {
    label: 'Calendar',
    items: [
      {
        type: PageType.Custom,
        label: 'Calendar',
        link: 'calendar',
        Icon: iconSet.Calendar,
      },
    ],
  },
  {
    label: 'Data',
    items: [
      {
        type: PageType.EntityView,
        logicalName: EntityName.Appointment,
      },
      {
        type: PageType.EntityView,
        logicalName: EntityName.Customer,
      },
      {
        type: PageType.EntityView,
        logicalName: EntityName.Service,
      },
    ],
  },
];
