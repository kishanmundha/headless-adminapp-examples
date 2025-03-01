'use client';

import '@headless-adminapp/app/index.css';
import '@headless-adminapp/fluent/styles.css';
import 'react-quill/dist/quill.snow.css';
import { webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { LayoutProvider } from '@headless-adminapp/fluent/App/LayoutProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { App } from '@headless-adminapp/fluent/App';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { clientExperienceStore } from '@/app/service-booking/config/client/experienceStore';
import { clientSchemaStore } from '@/app/service-booking/config/client/schemaStore';
import { appExperience } from '@/app/service-booking/config/client/app';
import { PropsWithChildren } from 'react';

import { registerIconSet } from '@headless-adminapp/icons/register';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { dataService } from '@/app/service-booking/config/client/dataService';
import { sessionResolver } from '@/app/service-booking/config/client/sessionResolver';

registerIconSet(iconSet);

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const router = useRouter();
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
        basePath: '/service-booking',
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
