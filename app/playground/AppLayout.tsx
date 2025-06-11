'use client';

import '@headless-adminapp/app/index.css';
import '@headless-adminapp/fluent/styles.css';
import 'react-quill/dist/quill.snow.css';
import { webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { LayoutProvider } from '@headless-adminapp/fluent/App/LayoutProvider';
import { usePathname, useSearchParams } from 'next/navigation';
import { App } from '@headless-adminapp/fluent/App';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { useNextRouter } from '@headless-adminapp/next-router';
import { clientExperienceStore } from './config/client/experienceStore';
import { clientSchemaStore } from './config/client/schemaStore';
import { appExperience } from './config/client/app';
import { PropsWithChildren } from 'react';

import { registerIconSet } from '@headless-adminapp/icons/register';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { dataService } from './config/client/dataService';
import { sessionResolver } from './config/client/sessionResolver';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

registerIconSet(iconSet);

export const queryClient = new QueryClient();

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const router = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const systemColorScheme = useSystemColorScheme();

  const theme = systemColorScheme === 'dark' ? webDarkTheme : webLightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider
        theme={theme}
        queryClient={queryClient}
        routeProps={{
          router: router,
          pathname: pathname,
          searchParams: searchParams,
          basePath: '/playground',
        }}
        dataService={dataService}
        metadataProps={{
          experienceStore: clientExperienceStore,
          schemaStore: clientSchemaStore,
          appExperience,
        }}
        authProps={{
          sessionResolver,
          onUnauthenticated: () => {
            router.replace('/');
          },
        }}
      >
        <App>{children}</App>
      </LayoutProvider>
    </QueryClientProvider>
  );
}
