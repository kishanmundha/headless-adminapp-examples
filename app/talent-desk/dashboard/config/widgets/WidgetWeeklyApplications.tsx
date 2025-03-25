import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import {
  DateAxisTickFormat,
  defineChartInfo,
} from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { tokens } from '@fluentui/react-components';
import { FC } from 'react';
import { FilterAttributes } from '../filterAttributes';

const chartInfo = defineChartInfo({
  type: 'area',
  areas: [
    {
      dataKey: 'count',
      type: 'number',
      dataLabel: 'Applications',
      curveType: 'monotone',
      color: tokens.colorPaletteLightTealBackground2,
    },
    {
      dataKey: 'shortlisted',
      type: 'number',
      dataLabel: 'Shortlisted',
      curveType: 'monotone',
      color: tokens.colorPaletteLightGreenBackground3,
    },
  ],
  xAxis: {
    dataKey: 'date',
    name: 'Date',
    tick: {
      type: 'time',
      format: DateAxisTickFormat.MonthDay,
    },
    domain: ['dataMin', 'dataMax'],
  },
  yAxis: {
    tick: {
      type: 'number',
    },
  },
});

export const WidgetWeeklyApplications: FC = () => {
  const filterValues = useInsightFilterValues<FilterAttributes>();
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:weekly-applications', {
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
