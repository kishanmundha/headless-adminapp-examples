'use client';

import { PageCalendar } from '@headless-adminapp/fluent/PageCalendar';
import { defineCalendarConfig } from '@headless-adminapp/app/calendar/utils';
import {
  beforeDescriptionAttributes,
  calendarEventSave,
  calendarEventsResolver,
  deleteEvent,
  filterAttributes,
} from './config';

const config = defineCalendarConfig({
  eventsResolver: calendarEventsResolver,
  saveEvent: calendarEventSave,
  deleteEvent: deleteEvent,
  beforeDescriptionAttributes: beforeDescriptionAttributes,
  filterAttributes: filterAttributes,
  defaultFilter: {},
  title: 'Interviews',
  description: 'Interview schedule',
  eventLabel: 'Interview',
  disableAllDay: true,
});

export default function Page() {
  return <PageCalendar config={config} />;
}
