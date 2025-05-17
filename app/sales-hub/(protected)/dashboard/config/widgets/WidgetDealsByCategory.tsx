import { useRefreshEventListener } from '@headless-adminapp/app/insights';
import { useCustomActionQuery } from '@headless-adminapp/app/transport/hooks/useCustomActionQuery';
import { defineChartInfo } from '@headless-adminapp/core/experience/insights';
import { WidgetChart } from '@headless-adminapp/fluent/Insights/WidgetChartContainer';
import { FC } from 'react';
import { dealSchema } from '@/app/sales-hub/config/schema/deal';

const chartInfo = defineChartInfo({
  type: 'pie',
  showLegend: true,
  pie: [
    {
      dataKey: 'amount',
      nameKey: 'category',
      dataTick: {
        type: 'currency',
      },
      nameTick: {
        type: 'category',
        options: dealSchema.attributes.category.options,
      },
    },
  ],
});

export const WidgetDealsByCategory: FC = () => {
  const { data, isFetching, isPending, refetch } = useCustomActionQuery<
    unknown[]
  >('insights:deals-by-category', {});

  useRefreshEventListener(refetch);

  return (
    <WidgetChart
      dataset={[data]}
      isFetching={isFetching}
      isPending={isPending}
      title="Deals by Category"
      chartInfo={chartInfo}
    />
  );
};
