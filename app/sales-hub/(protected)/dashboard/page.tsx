'use client';

import { config } from './config';
import { PageInsight } from '@headless-adminapp/fluent/PageInsight';

export default function DashboardPage() {
  return <PageInsight config={config} />;
}
