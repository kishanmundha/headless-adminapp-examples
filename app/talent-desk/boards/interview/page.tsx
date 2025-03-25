'use client';

import { PageBoard } from '@headless-adminapp/fluent/PageBoard';
import { config } from './config';

export default function Page() {
  return <PageBoard config={config} />;
}
