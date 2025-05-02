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
  title: 'Appointments',
  description: 'Appointment schedule',
  eventLabel: 'Appointment',
  disableAllDay: true,
  editOptions: {
    mode: 'custom',
    onClick: (event, options) => {
      options.openForm({
        logicalName: 'appointments',
        id: event.id,
      });
    },
  },
  createOptions: {
    mode: 'custom',
    allowQuickCreate: true,
    onClick: (defaultValues, options) => {
      options.openForm({
        logicalName: 'appointments',
        parameters: {
          title: defaultValues.title,
          start: defaultValues.start,
          end: defaultValues.end,
          description: defaultValues.description,
        },
      });
    },
  },
});

export default function Page() {
  return <PageCalendar config={config} />;
}
