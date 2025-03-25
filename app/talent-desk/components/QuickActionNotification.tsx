import { QuickActionItem } from '@headless-adminapp/fluent/App/QuickActionItem';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { FC } from 'react';

const MessageIcon = bundleLazyIcon('Chat24Regular', 'Chat24Filled');

export const QuickActionNotification: FC = () => {
  return (
    <QuickActionItem
      Icon={MessageIcon}
      label="Messages"
      link="/messages"
      badgeCount={5}
      badgeColor="success"
    />
  );
};
