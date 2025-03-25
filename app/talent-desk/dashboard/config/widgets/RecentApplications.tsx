'use client';

import { useRetriveRecords } from '@headless-adminapp/app/transport/hooks/useRetriveRecords';
import { WidgetSection } from '@headless-adminapp/fluent/Insights/WidgetSection';
import { WidgetTitleBar } from '@headless-adminapp/fluent/Insights/WidgetTitleBar';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { FC, Fragment, useMemo } from 'react';
import {
  ApplicationAttributes,
  applicationSchema,
} from '../../../config/schema/application';
import {
  Avatar,
  Body1,
  Caption1,
  Divider,
  tokens,
} from '@fluentui/react-components';
import { ScrollView } from '@headless-adminapp/app/components/ScrollView';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  useInsightFilterValues,
  useRefreshEventListener,
} from '@headless-adminapp/app/insights';
import { FilterAttributes } from '../filterAttributes';
import { Condition } from '@headless-adminapp/core/transport';

dayjs.extend(relativeTime);

const ViewAllIcon = bundleLazyIcon('List24Regular', 'List24Filled');

const columns: (keyof ApplicationAttributes)[] = [
  'applied_at',
  'candidate_id',
  'job_id',
];

export const RecentApplications: FC = () => {
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
    columns,
    expand: undefined,
    filter: {
      type: 'and',
      conditions: [...filterConditions],
    },
    maxRecords: 10,
    schema: applicationSchema,
    search: '',
    sorting: [
      {
        field: 'applied_at',
        order: 'desc',
      },
    ],
    disabled: false,
  });

  useRefreshEventListener(refetch);

  return (
    <WidgetSection>
      <WidgetTitleBar
        title="Recent Applications"
        commands={[
          [
            {
              type: 'button',
              text: 'View All',
              Icon: ViewAllIcon,
              appearance: 'colored',
            },
          ],
        ]}
      />
      <ScrollView>
        {data?.records.map((record, index) => {
          return (
            <Fragment key={record.id}>
              {index > 0 && (
                <div style={{ paddingLeft: 48, paddingRight: 8 }}>
                  <Divider style={{ opacity: 0.2 }} />
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: tokens.spacingHorizontalS,
                  paddingInline: tokens.spacingHorizontalS,
                  paddingBlock: tokens.spacingVerticalS,
                  paddingRight: tokens.spacingHorizontalM,
                }}
              >
                <Avatar
                  image={{
                    src: record.candidate_id?.avatar,
                  }}
                />
                <div
                  style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                  <Body1>{record.candidate_id?.name}</Body1>
                  <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                    Applied for{' '}
                    <span style={{ fontWeight: tokens.fontWeightMedium }}>
                      {record.job_id?.name}
                    </span>
                  </Caption1>
                </div>
                <div>
                  <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                    {record.applied_at
                      ? dayjs(record.applied_at).fromNow()
                      : ''}
                  </Caption1>
                </div>
              </div>
            </Fragment>
          );
        })}
      </ScrollView>
    </WidgetSection>
  );
};
