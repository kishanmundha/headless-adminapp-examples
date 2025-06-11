'use client';

import '@headless-adminapp/app/index.css';
import '@headless-adminapp/fluent/styles.css';
import 'react-quill/dist/quill.snow.css';
import { webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { LayoutProvider } from '@headless-adminapp/fluent/App/LayoutProvider';
import { usePathname, useSearchParams } from 'next/navigation';
import { App } from '@headless-adminapp/fluent/App';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { useNextRouter } from '@headless-adminapp/next-router';
import { clientExperienceStore } from './config/clientExperienceStore';
import { clientSchemaStore } from './config/clientSchemaStore';
import { PropsWithChildren } from 'react';

import { registerIconSet } from '@headless-adminapp/icons/register';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { dataService } from './DataService';
import { sessionResolver } from './sessionResolver';
import { appExperience } from './config/app';

registerIconSet(iconSet);

export default function AppLayout({ children }: PropsWithChildren) {
  const router = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const systemColorScheme = useSystemColorScheme();

  const theme = systemColorScheme === 'dark' ? webDarkTheme : webLightTheme;

  return (
    <LayoutProvider
      theme={theme}
      routeProps={{
        router: router,
        pathname: pathname,
        searchParams: searchParams,
        basePath: '/help-desk',
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
  );
}
