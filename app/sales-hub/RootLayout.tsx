'use client';

import '@headless-adminapp/app/index.css';
import '@headless-adminapp/fluent/styles.css';
import { webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { FluentProvider } from '@headless-adminapp/fluent/components/fluent/FluentProvider';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const systemColorScheme = useSystemColorScheme();

  const theme = systemColorScheme === 'dark' ? webDarkTheme : webLightTheme;

  return <FluentProvider theme={theme}>{children}</FluentProvider>;
}
