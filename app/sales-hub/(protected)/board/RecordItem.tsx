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
import { FC } from 'react';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { Data } from '@headless-adminapp/core/transport';
import dayjs from 'dayjs';
import { useOpenForm } from '@headless-adminapp/app/navigation/hooks';

import { getAttributeFormattedValue } from '@headless-adminapp/app/utils';
import { isColorDark } from '@headless-adminapp/app/utils/color';
import { Deal, dealSchema } from '@/app/sales-hub/config/schema/deal';
import { ChoiceBadge } from '@/packages/fluent/components/ChoiceBadge';
import { useLocale } from '@/packages/app/locale';

const CalenderIcon = bundleLazyIcon('Calendar24Regular', 'Calendar24Filled');
const ChatIcon = bundleLazyIcon('Chat24Regular', 'Chat24Filled');

const MoreMenuIcon = bundleLazyIcon(
  'MoreVertical24Regular',
  'MoreVertical24Filled'
);
const OpenIcon = bundleLazyIcon('Open24Regular', 'Open24Filled');

interface RecordItemProps {
  record: Data<Deal>;
}

export const RecordItem: FC<RecordItemProps> = ({ record }) => {
  const openForm = useOpenForm();
  const { currency } = useLocale();

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
                  logicalName: 'leads',
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
        <ChoiceBadge
          attribute={dealSchema.attributes.category}
          value={record.category}
          size="small"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingHorizontalS,
        }}
      >
        <Body1
          style={{
            fontWeight: tokens.fontWeightMedium,
            display: 'flex',
            gap: tokens.spacingHorizontalS,
            alignItems: 'center',
          }}
        >
          <Avatar
            image={{
              src: (record.companyid?.avatar as unknown as string) ?? '',
            }}
            style={{ width: 16, height: 16 }}
          />
          {record.companyid?.name}
        </Body1>
        <Body1
          style={{
            color: tokens.colorNeutralForeground2,
          }}
        >
          {record.amount &&
            getAttributeFormattedValue(
              dealSchema.attributes.amount,
              record.amount,
              {
                currency: currency.currency,
                currencyDisplay: currency.currencyDisplay,
                currencySign: currency.currencySign,
              }
            )}
        </Body1>
        <Caption1
          style={{
            color: tokens.colorNeutralForeground2,
            display: 'flex',
            gap: tokens.spacingHorizontalS,
            alignItems: 'center',
          }}
        >
          {record.title}
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
            <span>{dayjs(record.createdAt).format('MMM DD')}</span>
          </div>
        </div>
        {!!record.salesownerid && (
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
                content={record.salesownerid?.name ?? ''}
                relationship="description"
                positioning="before"
              >
                <Avatar
                  image={{
                    src: (record.salesownerid?.avatar as string) ?? '',
                  }}
                  style={{ width: 20, height: 20 }}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
