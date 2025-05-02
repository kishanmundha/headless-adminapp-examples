'use client';

import { PageCalendar } from '@headless-adminapp/fluent/PageCalendar';
import { defineCalendarConfig } from '@headless-adminapp/app/calendar/utils';
import {
  afterDescriptionAttributes,
  beforeDescriptionAttributes,
  calendarEventResolver,
  calendarEventSave,
  calendarEventsResolver,
  deleteEvent,
  filterAttributes,
} from './config';

const config = defineCalendarConfig({
  eventsResolver: calendarEventsResolver,
  eventResolver: calendarEventResolver,
  saveEvent: calendarEventSave,
  deleteEvent: deleteEvent,
  beforeDescriptionAttributes: beforeDescriptionAttributes,
  afterDescriptionAttributes: afterDescriptionAttributes,
  filterAttributes: filterAttributes,
  defaultFilter: {
    view: 'all',
  },
  title: 'Appointments',
  description: 'Manage your appointments',
  eventLabel: 'Appointment',
  createOptions: {
    mode: 'dialog',
  },
  editOptions: {
    mode: 'dialog',
  },
});

export default function Page() {
  return <PageCalendar config={config} />;
}
