import { defineInsightConfig } from '@headless-adminapp/core/experience/insights';
import { FilterAttributes, filterAttributes } from './filterAttributes';
import { WidgetDealsWonLost } from './widgets/WidgetDealsWonLost';
import { UpcomingActivities } from './widgets/UpcomingActivities';
import { WidgetDealPipeline } from './widgets/WidgetDealPipeline';
import { tokens } from '@fluentui/react-components';
import { WidgetTileBar } from './widgets/WidgetTileBar';
import { WidgetDealsByCategory } from './widgets/WidgetDealsByCategory';

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
            title: 'Opportunity',
            stage: ['opportunity'],
            color: tokens.colorPaletteLightTealBackground2,
          },
        },
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Proposal',
            stage: ['proposal'],
            color: tokens.colorPaletteLightGreenBackground2,
          },
        },
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Negotiation',
            stage: ['negotiation'],
            color: tokens.colorPaletteBeigeBackground2,
          },
        },
        {
          rows: 1,
          columns: 3,
          type: 'component',
          Component: WidgetTileBar,
          props: {
            title: 'Won',
            stage: ['won'],
            color: tokens.colorPaletteCornflowerBackground2,
          },
        },
      ],
    },
    {
      type: 'group',
      rows: 5,
      columns: 8,
      items: [
        {
          type: 'component',
          rows: 5,
          columns: 5,
          Component: WidgetDealsWonLost,
        },
        {
          type: 'group',
          rows: 5,
          columns: 3,
          items: [
            {
              type: 'component',
              rows: 3,
              columns: 3,
              Component: WidgetDealPipeline,
            },
            {
              type: 'component',
              rows: 2,
              columns: 3,
              Component: WidgetDealsByCategory,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      rows: 5,
      columns: 4,
      items: [
        {
          type: 'component',
          rows: 5,
          columns: 6,
          Component: UpcomingActivities,
        },
      ],
    },
  ],
});
