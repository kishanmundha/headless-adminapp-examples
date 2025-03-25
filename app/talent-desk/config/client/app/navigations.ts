import {
  NavPageSection,
  PageType,
} from '@headless-adminapp/core/experience/app';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { EntityName } from '../../enums';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { NavMessageCountBadge } from '../../../components/NavMessageBadge';
import { NavApplicationCountBadge } from '../../../components/NavApplicationCountBadge';

const DashboardIcon = bundleLazyIcon(
  'DataTrending24Regular',
  'DataTrending24Filled'
);
const BoardIcon = bundleLazyIcon(
  'ColumnTriple24Regular',
  'ColumnTriple24Filled'
);
const CalendarIcon = bundleLazyIcon(
  'CalendarClock24Regular',
  'CalendarClock24Filled'
);
const MessageIcon = bundleLazyIcon('Chat24Regular', 'Chat24Filled');
const HelpIcon = bundleLazyIcon('ChatHelp24Regular', 'ChatHelp24Filled');

export const navPageSections: NavPageSection[] = [
  {
    label: '',
    hideLabel: true,
    items: [
      {
        type: PageType.Custom,
        label: 'Dashboard',
        link: '/dashboard',
        Icon: DashboardIcon,
      },
      {
        type: PageType.Custom,
        label: 'Calendar',
        link: '/calendar',
        Icon: CalendarIcon,
      },
      {
        type: PageType.Category,
        label: 'Board',
        Icon: BoardIcon,
        items: [
          {
            type: PageType.Custom,
            label: 'Applications',
            link: '/boards/application',
          },
          {
            type: PageType.Custom,
            label: 'Interviews',
            link: '/boards/interview',
          },
          {
            type: PageType.Custom,
            label: 'Offers',
            link: '/boards/offer',
          },
        ],
      },
    ],
  },
  {
    label: 'Data',
    items: [
      {
        type: PageType.EntityView,
        logicalName: EntityName.Application,
        RightComponent: NavApplicationCountBadge,
      },
      {
        type: PageType.EntityView,
        logicalName: EntityName.Interview,
      },
      {
        type: PageType.EntityView,
        logicalName: EntityName.Offer,
      },
      {
        type: PageType.EntityView,
        logicalName: EntityName.Candidate,
      },
      {
        type: PageType.EntityView,
        logicalName: EntityName.Job,
      },
      {
        type: PageType.Custom,
        label: 'Messages',
        link: '/messages',
        Icon: MessageIcon,
        RightComponent: NavMessageCountBadge,
      },
    ],
  },
  {
    label: 'Configuration',
    items: [
      {
        type: PageType.Custom,
        label: 'Settings',
        link: '/settings',
        Icon: iconSet.Settings,
      },
      {
        type: PageType.Custom,
        label: 'Support',
        link: '/support',
        Icon: HelpIcon,
      },
    ],
  },
];
