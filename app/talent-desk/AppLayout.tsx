'use client';

import '@headless-adminapp/app/index.css';
import '@headless-adminapp/fluent/styles.css';
import 'react-quill/dist/quill.snow.css';
import {
  BrandVariants,
  createLightTheme,
  createDarkTheme,
  Theme,
} from '@fluentui/react-components';
import { LayoutProvider } from '@headless-adminapp/fluent/App/LayoutProvider';
import { usePathname, useSearchParams } from 'next/navigation';
import { App } from '@headless-adminapp/fluent/App';
import { useSystemColorScheme } from '@headless-adminapp/app/hooks/useSystemColorScheme';
import { useNextRouter } from '@headless-adminapp/next-router';
import { clientExperienceStore } from '@/app/talent-desk/config/client/experienceStore';
import { clientSchemaStore } from '@/app/talent-desk/config/client/schemaStore';
import { appExperience } from '@/app/talent-desk/config/client/app';
import { PropsWithChildren } from 'react';

import { registerIconSet } from '@headless-adminapp/icons/register';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { dataService } from '@/app/talent-desk/config/client/dataService';
import { sessionResolver } from '@/app/talent-desk/config/client/sessionResolver';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

registerIconSet(iconSet);

const myNewTheme: BrandVariants = {
  10: '#07010A',
  20: '#290735',
  30: '#460054',
  40: '#5B0064',
  50: '#710074',
  60: '#84137E',
  70: '#952587',
  80: '#A63590',
  90: '#B64699',
  100: '#C557A1',
  110: '#D368AA',
  120: '#DF7BB3',
  130: '#E98DBC',
  140: '#F2A1C5',
  150: '#F9B5D0',
  160: '#FEC9DB',
};

const lightTheme: Theme = {
  ...createLightTheme(myNewTheme),
};

const darkTheme: Theme = {
  ...createDarkTheme(myNewTheme),
};

darkTheme.colorBrandForeground1 = myNewTheme[110];
darkTheme.colorBrandForeground2 = myNewTheme[120];

export const queryClient = new QueryClient();

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const router = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const systemColorScheme = useSystemColorScheme();

  const theme = systemColorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider
        theme={theme}
        queryClient={queryClient}
        routeProps={{
          router: router,
          pathname: pathname,
          searchParams: searchParams,
          basePath: '/talent-desk',
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
