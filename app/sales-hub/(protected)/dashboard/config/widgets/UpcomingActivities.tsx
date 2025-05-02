'use client';

import { useRetriveRecords } from '@headless-adminapp/app/transport/hooks/useRetriveRecords';
import { WidgetSection } from '@headless-adminapp/fluent/Insights/WidgetSection';
import { WidgetTitleBar } from '@headless-adminapp/fluent/Insights/WidgetTitleBar';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { FC, Fragment } from 'react';
import {
  Body1,
  Caption1,
  Divider,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ScrollView } from '@headless-adminapp/app/components/ScrollView';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRefreshEventListener } from '@headless-adminapp/app/insights';
import {
  Activity,
  ActivityAttributes,
  activitySchema,
} from '@/app/sales-hub/config/schema/activity';
import { ChoiceBadge } from '@headless-adminapp/fluent/components/ChoiceBadge';
import { useOpenForm } from '@headless-adminapp/app/navigation';

dayjs.extend(relativeTime);

const ViewAllIcon = bundleLazyIcon('List24Regular', 'List24Filled');

const columns: (keyof Activity)[] = [
  'regardingobjectid',
  'activitytype',
  'scheduledstart',
  'status',
  'subject',
];

const useStyles = makeStyles({
  item: {
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
});

export const UpcomingActivities: FC = () => {
  const { data, refetch } = useRetriveRecords<ActivityAttributes>({
    columns,
    filter: {
      type: 'and',
      conditions: [
        {
          field: 'scheduledstart',
          operator: 'on-or-before',
          value: dayjs().add(7, 'day').format('YYYY-MM-DD'),
        },
        {
          field: 'status',
          operator: 'in',
          value: ['scheduled', 'todo'],
        },
        // ...filterConditions,
      ],
    },
    maxRecords: 20,
    schema: activitySchema,
    search: '',
    sorting: [
      {
        field: 'scheduledstart',
        order: 'asc',
      },
    ],
  });

  useRefreshEventListener(refetch);

  const openForm = useOpenForm();
  const styles = useStyles();

  return (
    <WidgetSection>
      <WidgetTitleBar
        title="Upcoming Activities"
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
                <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                  <Divider style={{ opacity: 0.2 }} />
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: tokens.spacingHorizontalS,
                  paddingInline: tokens.spacingHorizontalL,
                  paddingBlock: tokens.spacingVerticalS,
                  // paddingRight: tokens.spacingHorizontalM,
                  cursor: 'pointer',
                }}
                className={styles.item}
                onClick={() => {
                  openForm({
                    logicalName: record.activitytype!,
                    id: record.id,
                  });
                }}
              >
                {/* <Avatar
                  image={{
                    src: record.candidate_id?.avatar,
                  }}
                /> */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    gap: 4,
                  }}
                >
                  <ChoiceBadge
                    attribute={activitySchema.attributes.activitytype}
                    value={record.activitytype}
                    size="small"
                  />
                  <Body1>{record.subject}</Body1>
                  <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                    <span style={{ fontWeight: tokens.fontWeightMedium }}>
                      {record.regardingobjectid?.name}
                    </span>
                  </Caption1>
                </div>
                <div>
                  <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                    {record.scheduledstart
                      ? dayjs(record.scheduledstart).format('MMM DD')
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
