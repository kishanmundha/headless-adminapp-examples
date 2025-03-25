'use client';

import { useAuthSession } from '@headless-adminapp/app/auth';
import { PageEntityForm } from '@headless-adminapp/fluent/PageEntityForm';

export default function Page() {
  const authSession = useAuthSession();

  if (!authSession?.id) {
    return null;
  }

  return <PageEntityForm logicalName="users" recordId={authSession.id} />;
}
