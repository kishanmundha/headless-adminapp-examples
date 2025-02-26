import { iconSet } from '@headless-adminapp/icons-fluent';
import {
  NavPageGroupArea,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { EntityName } from '../../enums';

export const navPageGroupAreas: NavPageGroupArea[] = [
  {
    label: 'Main',
    groups: [
      {
        label: 'Calendar',
        items: [
          {
            type: PageType.Custom,
            label: 'Calendar',
            link: 'calendar',
            icon: iconSet.Calendar,
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
    ],
  },
];
