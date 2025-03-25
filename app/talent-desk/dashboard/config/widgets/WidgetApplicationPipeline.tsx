import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import { defineChartInfo } from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { tokens } from '@fluentui/react-components';
import { FC } from 'react';
import { FilterAttributes } from '../filterAttributes';

const chartInfo = defineChartInfo({
  type: 'funnel',
  dataTick: {
    type: 'number',
  },
  dataKey: 'count',
  nameKey: 'stage',
  colors: [
    tokens.colorPaletteLightTealBackground2,
    tokens.colorPaletteLightGreenBackground2,
    tokens.colorPaletteBeigeBackground2,
    tokens.colorPaletteCornflowerBackground2,
  ],
});

export const WidgetApplicationPipeline: FC = () => {
  const filterValues = useInsightFilterValues<FilterAttributes>();
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:application-pipeline', {
    job_ids: filterValues.job_id ? [filterValues.job_id.id] : [],
  });

  useRefreshEventListener(refetch);

  return (
    <WidgetChart
      dataset={[data]}
      isFetching={isFetching}
      isPending={isPending}
      title="Application Pipeline"
      chartInfo={chartInfo}
    />
  );
};
