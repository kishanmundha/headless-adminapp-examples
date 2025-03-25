import { defineInsightConfig } from '@headless-adminapp/core/experience/insights';
import { FilterAttributes, filterAttributes } from './filterAttributes';
import { RecentApplications } from './widgets/RecentApplications';
import { WidgetTileBar } from './widgets/WidgetTileBar';
import { tokens } from '@fluentui/react-components';
import { UpcomingInterviews } from './widgets/UpcomingInterviews';
import { WidgetWeeklyApplications } from './widgets/WidgetWeeklyApplications';
import { WidgetApplicationPipeline } from './widgets/WidgetApplicationPipeline';
import { WidgetApplicationByExperience } from './widgets/WidgetApplicationByExperience';
import { WidgetApplicationsByWeekday } from './widgets/WidgetApplicationsByWeekday';

export const config = defineInsightConfig<FilterAttributes>({
  title: 'Dashboard',
  subtitle: 'Insightful metrics and data',
  filterAttributes,
  defaultFilter: {},
  widgets: [
    {
      type: 'group',
      rows: 1,
      columns: 12,
      items: [
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Received',
            status: ['received'],
            color: tokens.colorPaletteLightTealBackground2,
          },
        },
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Shortlisted',
            status: ['shortlisted'],
            color: tokens.colorPaletteLightGreenBackground2,
          },
        },
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Inverviews',
            status: ['interview-scheduled'],
            color: tokens.colorPaletteBeigeBackground2,
          },
        },
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Hired',
            status: ['hired'],
            color: tokens.colorPaletteCornflowerBackground2,
          },
        },
      ],
    },
    {
      type: 'group',
      rows: 6,
      columns: 9,
      items: [
        {
          type: 'component',
          rows: 3,
          columns: 6,
          Component: WidgetWeeklyApplications,
        },
        {
          type: 'component',
          rows: 3,
          columns: 3,
          Component: WidgetApplicationPipeline,
        },
        {
          type: 'component',
          rows: 3,
          columns: 5,
          Component: WidgetApplicationsByWeekday,
        },
        {
          type: 'component',
          rows: 3,
          columns: 4,
          Component: WidgetApplicationByExperience,
        },
      ],
    },
    {
      type: 'group',
      rows: 6,
      columns: 3,
      items: [
        {
          type: 'component',
          rows: 3,
          columns: 3,
          Component: UpcomingInterviews,
        },
        {
          type: 'component',
          rows: 3,
          columns: 3,
          Component: RecentApplications,
        },
      ],
    },
  ],
});
