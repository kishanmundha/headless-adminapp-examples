import { bundleLazyIcon } from '@/packages/icons-fluent/lazyIcon';
import {
  NavPageSection,
  PageType,
} from '@headless-adminapp/core/experience/app';

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

const ActivityIcon = bundleLazyIcon(
  'DocumentCheckmark24Regular',
  'DocumentCheckmark24Filled'
);

export const navPageGroupAreas: NavPageSection[] = [
  {
    label: 'Home',
    hideLabel: true,
    items: [
      {
        type: PageType.Dashboard,
        label: 'Dashboard',
        Icon: DashboardIcon,
      },
      {
        type: PageType.Custom,
        label: 'Board',
        link: 'board',
        Icon: BoardIcon,
      },
      {
        type: PageType.Custom,
        label: 'Calendar',
        link: '/calendar',
        Icon: CalendarIcon,
      },
      {
        type: PageType.EntityView,
        logicalName: 'activities',
        Icon: ActivityIcon,
      },
    ],
  },
  {
    label: 'Data',
    items: [
      {
        type: PageType.EntityView,
        logicalName: 'deals',
      },
      {
        type: PageType.EntityView,
        logicalName: 'companies',
      },
      {
        type: PageType.EntityView,
        logicalName: 'contacts',
      },
    ],
  },
];
