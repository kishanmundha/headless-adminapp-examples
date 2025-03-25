import { defineSchemaAttributes } from '@headless-adminapp/core/schema/utils';
import { dataService } from '@/app/talent-desk/config/client/dataService';
import { Interview } from '@/app/talent-desk/config/schema/interview';
import {
  CalendarEventSaveFn,
  CalendarEventsResolverFn,
} from '@headless-adminapp/app/calendar/types';
import { Condition } from '@headless-adminapp/core/transport';
import { EntityName } from '../../config/enums';

export const beforeDescriptionAttributes = defineSchemaAttributes({
  candidate_id: {
    type: 'lookup',
    label: 'Candidate',
    guid: true,
    entity: EntityName.Candidate,
  },
  job_id: {
    type: 'lookup',
    label: 'Job Position',
    guid: true,
    entity: EntityName.Job,
  },
});

export type BeforeDescriptionAttributes = typeof beforeDescriptionAttributes;

export const filterAttributes = defineSchemaAttributes({
  job_id: {
    type: 'lookup',
    entity: EntityName.Job,
    guid: true,
    label: 'Job Position',
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

  if (options.filter?.job_id) {
    conditions.push({
      field: 'job_id',
      operator: 'eq',
      value: options.filter.job_id.id,
    });
  }

  const result = await dataService.retriveRecords<Interview>({
    logicalName: EntityName.Interview,
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
      'candidate_id',
      'job_id',
      'description',
    ],
    limit: 5000,
  });

  return result.records.map((record) => ({
    id: record.id,
    title: record.title ?? '',
    start: record.start ? new Date(record.start) : null,
    end: record.end ? new Date(record.end) : null,
    description: record.description,
    allDay: false,
    candidate_id: record.candidate_id,
    job_id: record.job_id,
  }));
};

export const calendarEventSave: CalendarEventSaveFn<
  BeforeDescriptionAttributes
> = async ({ event }) => {
  if (event.id) {
    await dataService.updateRecord<Interview>(EntityName.Interview, event.id, {
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      description: event.description,
      candidate_id: event.candidate_id,
      job_id: event.job_id,
    });
  } else {
    await dataService.createRecord<Interview>(EntityName.Interview, {
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      description: event.description,
      candidate_id: event.candidate_id,
      job_id: event.job_id,
    });
  }
};

export const deleteEvent = async (id: string) => {
  await dataService.deleteRecord(EntityName.Interview, id);
};
