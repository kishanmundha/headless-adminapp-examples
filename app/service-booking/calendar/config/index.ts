import { defineSchemaAttributes } from '@headless-adminapp/core/schema/utils';
import { dataService } from '@/app/service-booking/config/client/dataService';
import { Appointment } from '@/app/service-booking/config/schema/appointment';
import {
  CalendarEvent,
  CalendarEventResolverFn,
  CalendarEventSaveFn,
  CalendarEventsResolverFn,
} from '@headless-adminapp/app/calendar/types';
import { Condition } from '@headless-adminapp/core/transport';
import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { EntityName } from '../../config/enums';

export const beforeDescriptionAttributes = defineSchemaAttributes({
  customer_id: {
    type: 'lookup',
    label: 'Customer',
    guid: true,
    entity: EntityName.Customer,
  },
});

export type BeforeDescriptionAttributes = typeof beforeDescriptionAttributes;

export const afterDescriptionAttributes = defineSchemaAttributes({
  agent_id: {
    type: 'lookup',
    label: 'Assigned To',
    guid: true,
    entity: EntityName.User,
  },
});

export type AfterDescriptionAttributes = typeof afterDescriptionAttributes;

export const filterAttributes = defineSchemaAttributes({
  view: {
    type: 'choice',
    label: 'View',
    string: true,
    options: [
      {
        label: 'All Events',
        value: 'all',
      },
      {
        label: 'My Events',
        value: 'me',
      },
    ],
  },
  customer: {
    type: 'lookup',
    entity: EntityName.Customer,
    guid: true,
    label: 'Customer',
  },
});

export type FilterAttributes = typeof filterAttributes;

export const calendarEventsResolver: CalendarEventsResolverFn<
  FilterAttributes
> = async (options) => {
  const conditions: Condition<string>[] = [
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

  if (options.filter?.customer) {
    conditions.push({
      field: 'customer_id',
      operator: 'eq',
      value: options.filter.customer.id,
    });
  }

  if (options.filter?.view === 'me' && options.auth) {
    conditions.push({
      field: 'agent_id',
      operator: 'eq',
      value: options.auth.id,
    });
  }

  const result = await dataService.retriveRecords<Appointment>({
    logicalName: 'appointments',
    filter: {
      type: 'and',
      conditions,
    },
    sort: [],
    columns: [
      'id',
      'title',
      'start',
      'end',
      'allDay',
      // 'customer_id',
      // 'agent_id',
    ],
    limit: 5000,
  });

  return result.records.map((record) => ({
    id: record.id,
    title: record.title ?? '',
    start: record.start ? new Date(record.start) : null,
    end: record.end ? new Date(record.end) : null,
    description: record.description,
    allDay: record.allDay ?? false,
    // customer_id: record.customer_id,
    // agent_id: record.agent_id,
  }));
};

export const calendarEventResolver: CalendarEventResolverFn<
  CalendarEvent &
    InferredSchemaType<BeforeDescriptionAttributes> &
    InferredSchemaType<AfterDescriptionAttributes>
> = async (id) => {
  const record = await dataService.retriveRecord<Appointment>(
    'appointments',
    id,
    ['id', 'title', 'start', 'end', 'allDay', 'customer_id', 'agent_id']
  );

  return {
    id: record.id,
    title: record.title ?? '',
    start: record.start ? new Date(record.start) : null,
    end: record.end ? new Date(record.end) : null,
    description: record.description,
    allDay: record.allDay ?? false,
    customer_id: record.customer_id,
    agent_id: record.agent_id,
  };
};

export const calendarEventSave: CalendarEventSaveFn<
  BeforeDescriptionAttributes,
  AfterDescriptionAttributes
> = async ({ event }) => {
  if (event.id) {
    await dataService.updateRecord<Appointment>('appointments', event.id, {
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      allDay: event.allDay,
      description: event.description,
      customer_id: event.customer_id,
      agent_id: event.agent_id,
    });
  } else {
    await dataService.createRecord<Appointment>('appointments', {
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      allDay: event.allDay,
      description: event.description,
      customer_id: event.customer_id,
      agent_id: event.agent_id,
    });
  }
};

export const deleteEvent = async (id: string) => {
  await dataService.deleteRecord('appointments', id);
};
