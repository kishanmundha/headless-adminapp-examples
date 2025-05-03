'use client';

import {
  Link,
  makeStyles,
  Subtitle1,
  Subtitle2,
  Title1,
  tokens,
} from '@fluentui/react-components';
import Image from 'next/image';
import { FC } from 'react';

const useHomeStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingVerticalXXXL,
    boxSizing: 'border-box',
    background: tokens.colorNeutralBackground1,
    height: '100vh',
  },
});

export default function Home() {
  const styles = useHomeStyles();
  return (
    <div className={styles.root}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingVerticalS,
          marginBottom: tokens.spacingVerticalM,
          textAlign: 'center',
        }}
      >
        <Title1>Headless AdminApp</Title1>
        <Subtitle2 style={{ fontWeight: tokens.fontWeightRegular }}>
          Welcome to the Headless AdminApp demo. This project showcases a set of
          components and design patterns for creating admin applications
          efficiently.
        </Subtitle2>
        <Subtitle2 style={{ fontWeight: tokens.fontWeightRegular }}>
          <Link href="https://headless-adminapp.github.io/">Documentation</Link>{' '}
          |{' '}
          <Link href="https://github.com/headless-adminapp/adminapp">
            GitHub
          </Link>
        </Subtitle2>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingVerticalS,
        }}
      >
        <Subtitle1>Apps</Subtitle1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: tokens.spacingVerticalXL,
            flexWrap: 'wrap',
          }}
        >
          <FeatureItem
            href="/talent-desk"
            image="/screenshots/dashboard.png"
            title="Talent Desk"
          />
          <FeatureItem
            href="/sales-hub"
            image="/screenshots/crm.png"
            title="CRM"
          />
          <FeatureItem
            href="/help-desk"
            image="/screenshots/board.png"
            title="Help Desk"
          />
          <FeatureItem
            href="/service-booking"
            image="/screenshots/calendar.png"
            title="Service Booking"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingVerticalS,
        }}
      >
        <Subtitle1>Pages</Subtitle1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: tokens.spacingVerticalXL,
            flexWrap: 'wrap',
          }}
        >
          <FeatureItem
            href="/talent-desk/dashboard"
            image="/screenshots/dashboard.png"
            title="Dashboard"
          />
          <FeatureItem
            href="/help-desk/board"
            image="/screenshots/board.png"
            title="Board"
          />
          <FeatureItem
            href="/help-desk/data/tickets"
            image="/screenshots/datagrid.png"
            title="Data Listing"
          />
          <FeatureItem
            href="/help-desk/data/tickets/85b02bfe-e221-48e8-bc3d-2068f1416485"
            image="/screenshots/form.png"
            title="Data Form"
          />
          <FeatureItem
            href="/service-booking/calendar"
            image="/screenshots/calendar.png"
            title="Calendar"
          />
        </div>
      </div>
    </div>
  );
}

const useFeatureItemStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    gap: tokens.spacingVerticalM,
    transition: 'transform 0.2s, box-shadow 0.2s',
    background: tokens.colorNeutralBackground1,

    '&:hover': {
      transform: 'scale(1.2)',
      boxShadow: tokens.shadow16,
      border: `1px solid transparent`,
    },
  },
});

interface FeatureItemProps {
  href: string;
  title: string;
  image: string;
}

const FeatureItem: FC<FeatureItemProps> = ({ href, image, title }) => {
  const styles = useFeatureItemStyles();
  return (
    <Link href={href} className={styles.root}>
      <Image src={image} alt={title} width={287} height={139} />
      <div
        style={{
          fontSize: tokens.fontSizeBase500,
          fontWeight: tokens.fontWeightMedium,
        }}
      >
        {title}
      </div>
    </Link>
  );
};
