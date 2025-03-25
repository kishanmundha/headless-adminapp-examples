import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import { defineChartInfo } from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { FC } from 'react';
import { FilterAttributes } from '../filterAttributes';
import { tokens } from '@fluentui/react-components';

const chartInfo = defineChartInfo({
  type: 'scatter',
  xAxis: {
    dataKey: 'week_day',
    name: 'Weekday',
    tick: {
      type: 'weekday',
    },
    domain: [0, 6],
    range: [0, 6],
  },
  yAxis: {
    dataKey: 'hours',
    name: 'Hours',
    tick: {
      type: 'number',
    },
  },
  zAxis: {
    dataKey: 'count',
    name: 'Count',
    range: [50, 200],
    tick: {
      type: 'number',
    },
  },
  scatters: [
    {
      dataIndex: 0,
      dataKey: 'count',
      dataType: 'number',
      dataLabel: 'Applications',
      color: tokens.colorBrandBackground,
    },
  ],
});

export const WidgetApplicationHours: FC = () => {
  const filterValues = useInsightFilterValues<FilterAttributes>();
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:applications-by-hour', {
    job_ids: filterValues.job_id ? [filterValues.job_id.id] : [],
  });

  useRefreshEventListener(refetch);

  return (
    <WidgetChart
      dataset={[data]}
      isFetching={isFetching}
      isPending={isPending}
      title="Applications by hour"
      chartInfo={chartInfo}
    />
  );
};
