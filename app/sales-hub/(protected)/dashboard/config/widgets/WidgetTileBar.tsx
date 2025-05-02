'use client';

import { FC, useMemo } from 'react';
import { tokens } from '@fluentui/react-components';
import { WidgetTitleBar } from '@headless-adminapp/fluent/Insights/WidgetTitleBar';
import { useRetriveRecords } from '@headless-adminapp/app/transport/hooks/useRetriveRecords';
import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { FilterAttributes } from '../filterAttributes';
import { Condition } from '@headless-adminapp/core/transport';
import { dealSchema } from '@/app/sales-hub/config/schema/deal';

interface WidgetTileBarProps {
  title: string;
  color: string;
  stage: string[];
}

export const WidgetTileBar: FC<WidgetTileBarProps> = ({
  title,
  color,
  stage,
}) => {
  const filterValues = useInsightFilterValues<FilterAttributes>();

  const filterConditions: Condition[] = useMemo(() => {
    if (!filterValues.category?.length) {
      return [];
    }

    return [
      {
        field: 'category',
        operator: 'in',
        value: filterValues.category,
      },
    ];
  }, [filterValues]);

  const { data, refetch } = useRetriveRecords({
    schema: dealSchema,
    columns: [],
    maxRecords: 1,
    filter: {
      type: 'and',
      conditions: [
        {
          field: 'stage',
          operator: 'in',
          value: stage,
        },
        ...filterConditions,
      ],
    },
  });

  useRefreshEventListener(refetch);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        // background: tokens.colorNeutralBackground1,
        background: `linear-gradient(45deg, ${color}, ${tokens.colorNeutralBackground1})`,
        boxShadow: 'none',
        borderRadius: tokens.borderRadiusXLarge,
        flexDirection: 'column',
      }}
    >
      <WidgetTitleBar title={title} />
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingInline: tokens.spacingHorizontalL,
          fontWeight: tokens.fontWeightMedium,
          fontSize: tokens.fontSizeHero800,
        }}
      >
        {data?.count}
      </div>
    </div>
  );
};
