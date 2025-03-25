'use client';

import { PageEntityForm } from '@headless-adminapp/fluent/PageEntityForm';

export default function Page(
  props: Readonly<{
    params: { logicalName: string; id: string };
  }>
) {
  return (
    <PageEntityForm
      logicalName={props.params.logicalName}
      recordId={props.params.id}
    />
  );
}
