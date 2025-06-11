import { Data } from '@headless-adminapp/core/transport';
import {
  Body1Strong,
  Button,
  Caption1,
  Divider,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  tokens,
} from '@fluentui/react-components';
import { FC, Fragment, useRef } from 'react';
import { Timeline, timelineSchema } from '../../schema/timeline';
import { ScrollView } from '@headless-adminapp/app/components/ScrollView';
import { useRecordId } from '@headless-adminapp/app/dataform';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { useRetriveRecords } from '@headless-adminapp/app/transport/hooks/useRetriveRecords';
import { getAttributeFormattedValue } from '@headless-adminapp/app/utils';
import { taskSchema } from '../../schema/task';
import { ChoiceBadge } from '@headless-adminapp/fluent/components/ChoiceBadge';
import dayjs from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { BodyLoading } from '@headless-adminapp/fluent/components/BodyLoading';
import { useOpenForm } from '@headless-adminapp/app/navigation';
import { useLocale } from '@headless-adminapp/app/locale';
import { useOpenPromptDialog } from '@headless-adminapp/app/dialog';
import { noteSchema } from '../../schema/note';
import { useDataService } from '@headless-adminapp/app/transport';
import { appointmentSchema } from '../../schema/appointment';

dayjs.extend(utc);
dayjs.extend(timezone);

const AddIcon = bundleLazyIcon('Add24Regular', 'Add24Filled');

export const TimelineControl: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const recordId = useRecordId();
  const openForm = useOpenForm();

  const { data, refetch, isFetching } = useRetriveRecords({
    schema: timelineSchema,
    columns: [
      'id',
      'subject',
      'createdon',
      'updatedon',
      'notetext',
      'timelinetype',
      'scheduledstart',
      'scheduledend',
      'status',
    ],
    sorting: [
      {
        field: 'updatedon',
        order: 'desc',
      },
    ],
    disabled: !recordId,
    filter: {
      type: 'and',
      conditions: [
        {
          field: 'regardingobjectid',
          operator: 'eq',
          value: recordId,
        },
      ],
    },
  });

  const openPromptDialog = useOpenPromptDialog();
  const dataService = useDataService();

  const handleAddNote = async () => {
    const data = await openPromptDialog({
      title: 'Note',
      confirmButtonLabel: 'Add Note',
      attributes: {
        subject: noteSchema.attributes.subject,
        notetext: noteSchema.attributes.notetext,
      },
      defaultValues: {},
    });

    if (!data) {
      return;
    }

    await dataService.createRecord(noteSchema.logicalName, {
      ...data,
      regardingobjectid: {
        id: recordId,
        logicalName: timelineSchema.logicalName,
      },
    });

    refetch();
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          // gap: 12,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            paddingLeft: 16,
            paddingRight: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Body1Strong>Timelines</Body1Strong>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              icon={<iconSet.Refresh />}
              size="small"
              appearance="subtle"
              onClick={refetch}
            />
            <Menu>
              <MenuTrigger>
                <Button icon={<AddIcon />} size="small" appearance="subtle" />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      openForm({
                        logicalName: 'tasks',
                      })
                    }
                  >
                    Task
                  </MenuItem>
                  <MenuItem onClick={() => handleAddNote()}>Note</MenuItem>
                  <MenuItem
                    onClick={() =>
                      openForm({
                        logicalName: 'appointments',
                      })
                    }
                  >
                    Appointment
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>
        <div>
          <Divider style={{ opacity: 0.2 }} />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              // gap: 4,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                minHeight: 400,
                position: 'relative',
              }}
            >
              <ScrollView autoHide shadowEffect>
                <div
                  style={{ display: 'flex', flexDirection: 'column' }}
                  ref={scrollRef}
                >
                  {data?.records.map((record: Data<Timeline>, index) => {
                    return (
                      <Fragment key={record.id}>
                        {index > 0 && <Divider style={{ opacity: 0.2 }} />}
                        <TimelineItem record={record} refetch={refetch} />
                      </Fragment>
                    );
                  })}
                </div>
              </ScrollView>
              <BodyLoading loading={isFetching} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  item: {
    '& .timeline_action': {
      opacity: 0,
    },
    '&:hover': {
      background: tokens.colorNeutralBackground1Hover,
      '& .timeline_action': {
        opacity: 1,
      },
    },
  },
});

interface TimelineItemProps {
  record: Data<Timeline>;
  refetch?: () => void;
}

function TimelineItem({ record, refetch }: TimelineItemProps) {
  const styles = useStyles();
  const openForm = useOpenForm();
  const locale = useLocale();
  const { timezone, dateFormats, timeFormats } = locale;

  const openPromptDialog = useOpenPromptDialog();
  const dataService = useDataService();

  const handleEditNote = async () => {
    const data = await openPromptDialog({
      title: 'Note',
      confirmButtonLabel: 'Update Note',
      attributes: {
        subject: noteSchema.attributes.subject,
        notetext: noteSchema.attributes.notetext,
      },
      defaultValues: {
        subject: record.subject,
        notetext: record.notetext,
      },
    });

    if (!data) {
      return;
    }

    await dataService.updateRecord(noteSchema.logicalName, record.id, {
      ...data,
    });

    refetch?.();
  };

  switch (record.$entity) {
    case 'tasks':
      return (
        <div
          className={styles.item}
          style={{
            position: 'relative',
            minHeight: 40,
            paddingInline: tokens.spacingHorizontalL,
            paddingBlock: tokens.spacingVerticalS,
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacingVerticalS,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacingHorizontalS,
            }}
          >
            <Body1Strong style={{ fontWeight: tokens.fontWeightMedium }}>
              Task
            </Body1Strong>
            <ChoiceBadge
              value={record.status}
              formattedValue={getAttributeFormattedValue(
                taskSchema.attributes.status,
                record.status,
                locale
              )}
              attribute={taskSchema.attributes.status}
              size="small"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacingHorizontalXXS,
            }}
          >
            <Caption1>{record.subject}</Caption1>
            {record.scheduledstart && (
              <Caption1>
                Due on{' '}
                {dayjs(record.scheduledstart)
                  .tz(timezone)
                  .format(dateFormats.short + ' ' + timeFormats.short)}
              </Caption1>
            )}
          </div>
          <ModifiedInfoLine record={record} />
          <Button
            className="timeline_action"
            icon={<iconSet.Edit size={16} />}
            size="small"
            appearance="subtle"
            style={{ position: 'absolute', right: 8, top: 4 }}
            onClick={() =>
              openForm({ logicalName: record.$entity, id: record.id })
            }
          />
        </div>
      );
    case 'notes':
      return (
        <div
          className={styles.item}
          style={{
            position: 'relative',
            minHeight: 40,
            paddingInline: tokens.spacingHorizontalL,
            paddingBlock: tokens.spacingVerticalS,
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacingVerticalS,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacingHorizontalS,
            }}
          >
            <Body1Strong style={{ fontWeight: tokens.fontWeightMedium }}>
              Note
            </Body1Strong>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacingHorizontalXXS,
            }}
          >
            <Caption1
              style={{
                fontWeight: tokens.fontWeightMedium,
                whiteSpace: 'pre-wrap',
              }}
            >
              {record.subject}
            </Caption1>
            <Caption1 style={{ whiteSpace: 'pre-wrap' }}>
              {record.notetext}
            </Caption1>
          </div>
          <ModifiedInfoLine record={record} />
          <Button
            className="timeline_action"
            icon={<iconSet.Edit size={16} />}
            size="small"
            appearance="subtle"
            style={{ position: 'absolute', right: 8, top: 4 }}
            onClick={handleEditNote}
          />
        </div>
      );
    case 'appointments':
      return (
        <div
          className={styles.item}
          style={{
            position: 'relative',
            minHeight: 40,
            paddingInline: tokens.spacingHorizontalL,
            paddingBlock: tokens.spacingVerticalS,
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacingVerticalS,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacingHorizontalS,
            }}
          >
            <Body1Strong style={{ fontWeight: tokens.fontWeightMedium }}>
              Appointment
            </Body1Strong>
            <ChoiceBadge
              value={record.status}
              formattedValue={getAttributeFormattedValue(
                appointmentSchema.attributes.status,
                record.status,
                locale
              )}
              attribute={appointmentSchema.attributes.status}
              size="small"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacingHorizontalXXS,
            }}
          >
            <Caption1>{record.subject}</Caption1>
            {(record.scheduledstart || record.scheduledend) && (
              <Caption1>
                {record.scheduledstart &&
                  dayjs(record.scheduledstart)
                    .tz(timezone)
                    .format(dateFormats.short + ' ' + timeFormats.short)}
                {' - '}
                {record.scheduledend &&
                  dayjs(record.scheduledend)
                    .tz(timezone)
                    .format(timeFormats.short)}
              </Caption1>
            )}
            {record.notetext && (
              <Caption1 style={{ whiteSpace: 'pre' }}>
                Note: {record.notetext}
              </Caption1>
            )}
          </div>
          <ModifiedInfoLine record={record} />
          <Button
            className="timeline_action"
            icon={<iconSet.Edit size={16} />}
            size="small"
            appearance="subtle"
            style={{ position: 'absolute', right: 8, top: 4 }}
            onClick={() =>
              openForm({ logicalName: record.$entity, id: record.id })
            }
          />
        </div>
      );
  }

  return <div>{record.$entity} not mapped</div>;
}

interface ModifiedInfoLineProps {
  record: Data<Timeline>;
}

const ModifiedInfoLine: FC<ModifiedInfoLineProps> = ({ record }) => {
  const { timezone, dateFormats, timeFormats } = useLocale();

  return (
    <div>
      <Caption1>
        Modified on:{' '}
        {dayjs(record.updatedon).tz(timezone).format(dateFormats.short)}{' '}
        {dayjs(record.updatedon).tz(timezone).format(timeFormats.short)}
      </Caption1>
    </div>
  );
};
