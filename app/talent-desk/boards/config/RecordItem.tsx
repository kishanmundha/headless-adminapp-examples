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
  tokens,
} from '@fluentui/react-components';
import { FC } from 'react';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { Data } from '@headless-adminapp/core/transport';
import dayjs from 'dayjs';
import { useOpenForm } from '@headless-adminapp/app/navigation/hooks';

import { EntityName } from '@/app/talent-desk/config/enums';
import { Application } from '@/app/talent-desk/config/schema/application';

const CalenderIcon = bundleLazyIcon('Calendar24Regular', 'Calendar24Filled');

const MoreMenuIcon = bundleLazyIcon(
  'MoreVertical24Regular',
  'MoreVertical24Filled'
);
const OpenIcon = bundleLazyIcon('Open24Regular', 'Open24Filled');

interface RecordItemProps {
  record: Data<Application>;
}

export const RecordItem: FC<RecordItemProps> = ({ record }) => {
  const openForm = useOpenForm();

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
                  logicalName: EntityName.Application,
                  id: record.id,
                });
              }}
            >
              Open record
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      {/* <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
        <Badge
          style={{
            color,
            backgroundColor: bgColor,
            fontWeight: tokens.fontWeightRegular,
          }}
        >
          {getAttributeFormattedValue(
            ticketSchema.attributes.category,
            record.category
          )}
        </Badge>
      </div> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingHorizontalS,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacingHorizontalS,
          }}
        >
          <Avatar
            image={{
              src: (record.candidate_id?.avatar as unknown as string) ?? '',
            }}
            style={{ width: 24, height: 24 }}
          />
          <Body1 style={{ fontWeight: tokens.fontWeightMedium }}>
            {record.candidate_id?.name}
          </Body1>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacingHorizontalS,
          }}
        >
          <div style={{ width: 24 }} />
          <Caption1
            style={{
              color: tokens.colorNeutralForeground2,
              display: 'flex',
              gap: tokens.spacingHorizontalS,
              alignItems: 'center',
            }}
          >
            Position: {record.job_id?.name}
          </Caption1>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacingHorizontalS,
          }}
        >
          <div style={{ width: 24 }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Caption1
              style={{
                color: tokens.colorNeutralForeground2,
                display: 'flex',
                gap: tokens.spacingHorizontalS,
                alignItems: 'center',
              }}
            >
              Experience: 5 years
            </Caption1>
          </div>
        </div>
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
            <div style={{ width: 26 }} />
            <CalenderIcon size={16} filled opacity={0.5} />
            <span>{dayjs(record.applied_at).format('MMM DD')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
