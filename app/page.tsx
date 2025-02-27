'use client';

import {
  Body1,
  FluentProvider,
  Link,
  Subtitle2,
  Title1,
  tokens,
} from '@fluentui/react-components';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { webLightTheme, webDarkTheme } from '@fluentui/react-components';
import Image from 'next/image';
import { FC } from 'react';

export default function Home() {
  const systemColorScheme = useSystemColorScheme();
  const theme = systemColorScheme === 'dark' ? webDarkTheme : webLightTheme;

  return (
    <FluentProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingVerticalM,
          padding: tokens.spacingVerticalM,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacingVerticalS,
            marginBottom: tokens.spacingVerticalM,
          }}
        >
          <Title1>Headless AdminApp</Title1>
            <Body1>
            Welcome to the Headless AdminApp demo. This project showcases a set of components and design patterns for creating admin applications efficiently.
            </Body1>
          <Body1>
            <Link href="https://headless-adminapp.github.io/">
              Documentation
            </Link>{' '}
            |{' '}
            <Link href="https://github.com/headless-adminapp/adminapp">
              GitHub
            </Link>
          </Body1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacingVerticalS,
          }}
        >
          <Subtitle2>Apps</Subtitle2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: tokens.spacingVerticalM,
            }}
          >
            <Test
              href="/help-desk"
              image="/screenshots/board.png"
              title="Help Desk"
            />
            <Test
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
          <Subtitle2>Pages</Subtitle2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: tokens.spacingVerticalM,
            }}
          >
            <Test
              href="/help-desk/board"
              image="/screenshots/board.png"
              title="Board"
            />
            <Test
              href="/help-desk/data/ticets"
              image="/screenshots/datagrid.png"
              title="Data Listing"
            />
            <Test
              href="/help-desk/data/tickets/85b02bfe-e221-48e8-bc3d-2068f1416485"
              image="/screenshots/form.png"
              title="Data Form"
            />
            <Test
              href="/service-booking/calendar"
              image="/screenshots/calendar.png"
              title="Calendar"
            />
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}

interface TestProps {
  href: string;
  title: string;
  image: string;
}

const Test: FC<TestProps> = ({ href, image, title }) => {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingVerticalM,
        gap: tokens.spacingVerticalM,
      }}
    >
      <Image src={image} alt={title} width={287} height={139} />
      <div>{title}</div>
    </Link>
  );
};
