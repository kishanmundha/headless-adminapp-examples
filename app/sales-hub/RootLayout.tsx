'use client';

import '@headless-adminapp/app/index.css';
import '@headless-adminapp/fluent/styles.css';
import {
  webLightTheme,
  webDarkTheme,
  FluentProvider,
} from '@fluentui/react-components';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const systemColorScheme = useSystemColorScheme();

  const theme = systemColorScheme === 'dark' ? webDarkTheme : webLightTheme;

  return <FluentProvider theme={theme}>{children}</FluentProvider>;
}
