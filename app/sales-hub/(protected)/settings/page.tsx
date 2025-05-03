'use client';

import { PageCustomEntityForm } from '@headless-adminapp/fluent/PageEntityForm/PageCustomEntityForm';
import { settingSchema } from './config/schema';
import { form } from './config/form';
import { commands } from './config/commands';
import { saveRecordFn } from './config/saveRecordFn';
import { retriveRecordFn } from './config/retriveRecordFn';

// A custom page with custom schema, form, commands, saveRecordFn, and retriveRecordFn
// This page is usefull when we want to use a schema which is not real schema of db
// Example:
//   1. Settings stored in local storage
//   2. A page which used merged data of multiple schemas
//   3. A page which used data from multiple sources
//
// :: This page can be removed if not needed

export default function Page() {
  return (
    <PageCustomEntityForm
      schema={settingSchema}
      form={form}
      commands={commands}
      saveRecordFn={saveRecordFn}
      retriveRecordFn={retriveRecordFn}
      recordId="1"
    />
  );
}
