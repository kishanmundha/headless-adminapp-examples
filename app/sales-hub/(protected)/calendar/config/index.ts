import { defineSchemaAttributes } from '@headless-adminapp/core/schema/utils';
import {
  CalendarEventSaveFn,
  CalendarEventsResolverFn,
} from '@headless-adminapp/app/calendar/types';
import { Filter } from '@headless-adminapp/core/transport';
import { Appointment } from '@/app/sales-hub/config/schema/appointment';
import { dataService } from '@/app/sales-hub/config/client/dataService';

export const beforeDescriptionAttributes = defineSchemaAttributes({});

export type BeforeDescriptionAttributes = typeof beforeDescriptionAttributes;

export const filterAttributes = defineSchemaAttributes({});

export type FilterAttributes = typeof filterAttributes;

export const calendarEventsResolver: CalendarEventsResolverFn<
  FilterAttributes
> = async (options) => {
  const conditions: Filter['conditions'] = [
    {
      field: 'end',
      operator: 'gte',
      value: options.start.toISOString(),
    },
    {
      field: 'start',
      operator: 'lt',
      value: options.end.toISOString(),
    },
  ];

  const result = await dataService.retriveRecords<Appointment>({
    logicalName: 'appointments',
    filter: {
      type: 'and',
      conditions,
    },
    sort: [],
    columns: ['id', 'title', 'start', 'end', 'description'],
    limit: 5000,
  });

  return result.records.map((record) => ({
    id: record.id,
    title: record.title ?? '',
    start: record.start ? new Date(record.start) : null,
    end: record.end ? new Date(record.end) : null,
    description: record.description,
    allDay: false,
  }));
};

export const calendarEventSave: CalendarEventSaveFn<
  BeforeDescriptionAttributes
> = async ({ event }) => {
  if (event.id) {
    await dataService.updateRecord<Appointment>('appointments', event.id, {
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      description: event.description,
    });
  } else {
    await dataService.createRecord<Appointment>('appointments', {
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      description: event.description,
    });
  }
};

export const deleteEvent = async (id: string) => {
  await dataService.deleteRecord('appointments', id);
};
