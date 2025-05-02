import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import {
  ChartInfo,
  DateAxisTickFormat,
} from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { FC } from 'react';
import { FilterAttributes } from '../filterAttributes';

function defineChartInfo(chartInfo: ChartInfo): ChartInfo {
  return chartInfo;
}

const chartInfo = defineChartInfo({
  type: 'bar',
  stackOffset: 'sign',
  bars: [
    {
      dataKey: 'won',
      dataLabel: 'Won',
      dataType: 'money',
      color: '#208428',
      stackId: 'stack',
    },
    {
      dataKey: 'pending',
      dataLabel: 'Pending',
      dataType: 'money',
      color: '#a0c4a8',
      stackId: 'stack',
    },
    {
      dataKey: 'lost',
      dataLabel: 'Lost',
      dataType: 'money',
      color: '#882428',
      stackId: 'stack',
    },
  ],
  xAxis: {
    dataKey: 'date',
    name: 'Month',
    tick: {
      type: 'time',
      format: DateAxisTickFormat.Month,
    },
    domain: ['dataMin', 'dataMax'],
  },
  yAxis: {
    tick: {
      type: 'number',
    },
  },
});

export const WidgetDealsWonLost: FC = () => {
  const filterValues = useInsightFilterValues<FilterAttributes>();
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:deals-won-lost', {
    category: filterValues.category,
  });

  useRefreshEventListener(refetch);

  return (
    <WidgetChart
      dataset={[data]}
      isFetching={isFetching}
      isPending={isPending}
      title="Deals"
      chartInfo={chartInfo}
    />
  );
};
