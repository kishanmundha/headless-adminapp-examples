'use client';

import { useState } from 'react';
import { PageEntityView } from '@headless-adminapp/fluent/PageEntityView';

export default function Page(
  props: Readonly<{ params: { logicalName: string } }>
) {
  const [viewId, setViewId] = useState<string | undefined>(undefined);

  return (
    <PageEntityView
      logicalName={props.params.logicalName}
      viewId={viewId}
      onChangeView={setViewId}
    />
  );
}
