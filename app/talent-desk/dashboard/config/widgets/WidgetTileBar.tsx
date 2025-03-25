'use client';

import { FC, useMemo } from 'react';
import { tokens } from '@fluentui/react-components';
import { WidgetTitleBar } from '@headless-adminapp/fluent/Insights/WidgetTitleBar';
import { useRetriveRecords } from '@headless-adminapp/app/transport/hooks/useRetriveRecords';
import { applicationSchema } from '../../../config/schema/application';
import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { FilterAttributes } from '../filterAttributes';
import { Condition } from '@headless-adminapp/core/transport';

interface WidgetTileBarProps {
  title: string;
  color: string;
  status: string[];
}

export const WidgetTileBar: FC<WidgetTileBarProps> = ({
  title,
  color,
  status,
}) => {
  const filterValues = useInsightFilterValues<FilterAttributes>();

  const filterConditions: Condition[] = useMemo(() => {
    if (!filterValues.job_id) {
      return [];
    }

    return [
      {
        field: 'job_id',
        operator: 'in',
        value: [filterValues.job_id.id],
      },
    ];
  }, [filterValues]);

  const { data, refetch } = useRetriveRecords({
    schema: applicationSchema,
    columns: [],
    maxRecords: 1,
    filter: {
      type: 'and',
      conditions: [
        {
          field: 'status',
          operator: 'in',
          value: status,
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
