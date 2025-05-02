'use client';

import { PageLogin } from '@headless-adminapp/fluent/components/PageLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { sessionResolver } from '../config/client/sessionResolver';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = useMemo(() => {
    if (typeof window === 'undefined') {
      return '/sales-hub/welcome';
    }

    const next = searchParams.get('next');

    if (!next) {
      return '/sales-hub/welcome';
    }

    return next;
  }, [searchParams]);

  const nextRef = useRef(next);
  nextRef.current = next;

  useEffect(() => {
    sessionResolver()
      .then((session) => {
        if (session) {
          console.log('session', session, next);
          router.replace(nextRef.current);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageLogin
      logoImageUrl="/icons/sales-hub.png"
      illustrationImageUrl="/illustrations/sales-hub.svg"
      subtitle="Username is 'admin' and password is '123'"
      defaultValues={{
        username: 'admin',
        password: '123',
      }}
      onLogin={async (username, password) => {
        const response = await fetch('/api/sales-hub/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error('Unable to login');
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error);
        }

        router.replace(next);
      }}
    />
  );
}
