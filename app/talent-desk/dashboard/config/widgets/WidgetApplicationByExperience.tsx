import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import { defineChartInfo } from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { FC } from 'react';
import { FilterAttributes } from '../filterAttributes';

const chartInfo = defineChartInfo({
  type: 'pie',
  showLegend: true,
  pie: [
    {
      dataKey: 'count',
      nameKey: 'exp',
      dataTick: {
        type: 'number',
      },
      nameTick: {
        type: 'category',
      },
    },
  ],
});

export const WidgetApplicationByExperience: FC = () => {
  const filterValues = useInsightFilterValues<FilterAttributes>();
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:applications-by-experience', {
    job_ids: filterValues.job_id ? [filterValues.job_id.id] : [],
  });

  useRefreshEventListener(refetch);

  return (
    <WidgetChart
      dataset={[data]}
      isFetching={isFetching}
      isPending={isPending}
      title="Applications by Experience"
      chartInfo={chartInfo}
    />
  );
};
