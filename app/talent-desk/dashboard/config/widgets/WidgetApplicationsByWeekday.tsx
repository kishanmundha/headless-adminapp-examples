import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import { ChartInfo } from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { FC } from 'react';
import { FilterAttributes } from '../filterAttributes';

function defineChartInfo(chartInfo: ChartInfo): ChartInfo {
  return chartInfo;
}

const chartInfo = defineChartInfo({
  type: 'bar',
  bars: [
    {
      dataKey: 'count',
      dataLabel: 'Applications',
      dataType: 'number',
      color: '#8884d8',
      barSize: 20,
      radius: 4,
    },
  ],
  xAxis: {
    dataKey: 'weekday',
    name: 'Weekday',
    tick: {
      type: 'category',
      options: [
        {
          value: '0',
          label: 'Monday',
        },
        {
          value: '1',
          label: 'Tuesday',
        },
        {
          value: '2',
          label: 'Wednesday',
        },
        {
          value: '3',
          label: 'Thursday',
        },
        {
          value: '4',
          label: 'Friday',
        },
        {
          value: '5',
          label: 'Saturday',
        },
        {
          value: '6',
          label: 'Sunday',
        },
      ],
    },
    domain: ['dataMin', 'dataMax'],
  },
  yAxis: {
    tick: {
      type: 'number',
    },
  },
});

export const WidgetApplicationsByWeekday: FC = () => {
  const filterValues = useInsightFilterValues<FilterAttributes>();
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:applications-by-weekday', {
    job_ids: filterValues.job_id ? [filterValues.job_id.id] : [],
  });

  useRefreshEventListener(refetch);

  return (
    <WidgetChart
      dataset={[data]}
      isFetching={isFetching}
      isPending={isPending}
      title="Applications by Weekday"
      chartInfo={chartInfo}
    />
  );
};
