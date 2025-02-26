import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tag,
  tokens,
  Tooltip,
} from '@fluentui/react-components';
import { Ticket, ticketSchema } from '../config/schema/ticket';
import { FC, useMemo } from 'react';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { Data } from '@headless-adminapp/core/transport';
import { Customer } from '../config/schema/customer';
import dayjs from 'dayjs';
import { useOpenForm } from '@headless-adminapp/app/navigation/hooks';

import { getAttributeFormattedValue } from '@headless-adminapp/app/utils';
import { isColorDark } from '@headless-adminapp/app/utils/color';
import { EntityName } from '../config/enums';

const CalenderIcon = bundleLazyIcon('Calendar24Regular', 'Calendar24Filled');
const ChatIcon = bundleLazyIcon('Chat24Regular', 'Chat24Filled');

const MoreMenuIcon = bundleLazyIcon(
  'MoreVertical24Regular',
  'MoreVertical24Filled'
);
const OpenIcon = bundleLazyIcon('Open24Regular', 'Open24Filled');

interface RecordItemProps {
  record: Data<Ticket>;
}

export const RecordItem: FC<RecordItemProps> = ({ record }) => {
  const customer = record.$expand?.customer_id as Data<Customer>;
  const openForm = useOpenForm();

  const bgColor = useMemo(() => {
    if (!record.category || !ticketSchema.attributes.category.options) {
      return;
    }

    return ticketSchema.attributes.category.options.find(
      (option) => option.value === record.category
    )?.color;
  }, [ticketSchema.attributes.category.options, record.category]);

  const color = useMemo(() => {
    if (!bgColor) {
      return;
    }

    return isColorDark(bgColor) ? '#FFFFFF' : '#000000';
  }, [bgColor]);

  return (
    <div
      style={{
        padding: tokens.spacingHorizontalM,
        gap: tokens.spacingHorizontalS,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Menu positioning="below-end">
        <MenuTrigger>
          <Button
            icon={<MoreMenuIcon size={16} />}
            size="small"
            appearance="subtle"
            style={{ position: 'absolute', top: 8, right: 8 }}
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem
              icon={<OpenIcon size={20} />}
              onClick={() => {
                openForm({
                  logicalName: EntityName.Ticket,
                  id: record.id,
                });
              }}
            >
              Open record
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
        <Tag size="extra-small" style={{ color, backgroundColor: bgColor }}>
          {getAttributeFormattedValue(
            ticketSchema.attributes.category,
            record.category
          )}
        </Tag>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingHorizontalS,
        }}
      >
        <Body1 style={{ fontWeight: tokens.fontWeightMedium }}>
          {record.subject}
        </Body1>
        <Caption1
          style={{
            color: tokens.colorNeutralForeground2,
            display: 'flex',
            gap: tokens.spacingHorizontalS,
            alignItems: 'center',
          }}
        >
          <Avatar
            image={{
              src: (customer?.avatar as unknown as string) ?? '',
            }}
            style={{ width: 16, height: 16 }}
          />
          {record.customer_id?.name}
        </Caption1>
      </div>
      <div
        style={{
          display: 'flex',
          gap: tokens.spacingHorizontalS,
          height: 24,
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: tokens.spacingHorizontalS,
            color: tokens.colorNeutralForeground4,
            fontSize: tokens.fontSizeBase200,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: tokens.spacingHorizontalXXS,
              alignItems: 'center',
            }}
          >
            <CalenderIcon size={16} filled opacity={0.5} />
            <span>{dayjs(record.created_at).format('MMM DD')}</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: tokens.spacingHorizontalXXS,
              alignItems: 'center',
            }}
          >
            <ChatIcon size={16} filled opacity={0.5} />
            <span>{record.messages}</span>
          </div>
        </div>
        {!!record.agent_id && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: tokens.spacingHorizontalS,
            }}
          >
            <div>
              <Tooltip
                content={record.agent_id?.name ?? ''}
                relationship="description"
                positioning="before"
              >
                <Avatar
                  image={{
                    src: (record.$expand?.agent_id?.avatar as string) ?? '',
                  }}
                  style={{ width: 20, height: 20 }}
                />
              </Tooltip>
            </div>
            {/* <div
            style={{
              fontSize: tokens.fontSizeBase200,
              color: tokens.colorNeutralForeground3,
            }}
          >
            {record.agent_id?.name}
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
