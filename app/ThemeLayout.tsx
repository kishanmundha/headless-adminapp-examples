'use client';

import { webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const FluentProvider = dynamic(
  () => import('@fluentui/react-components').then((mod) => mod.FluentProvider),
  { ssr: false }
);

export default function ThemeLayout({ children }: PropsWithChildren) {
  const systemColorScheme = useSystemColorScheme();
  const theme = systemColorScheme === 'dark' ? webDarkTheme : webLightTheme;

  return <FluentProvider theme={theme}>{children}</FluentProvider>;
}
