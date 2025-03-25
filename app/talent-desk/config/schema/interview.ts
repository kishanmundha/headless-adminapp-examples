import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const interviewSchema = defineSchema({
  logicalName: EntityName.Interview,
  collectionName: 'td_interviews',
  label: 'Interview',
  pluralLabel: 'Interviews',
  idAttribute: 'id',
  primaryAttribute: 'title',
  createdAtAttribute: 'created_at',
  updatedAtAttribute: 'updated_at',
  ownership: 'scoped',
  attributes: {
    id: {
      type: 'id',
      label: 'Id',
      required: true,
      readonly: true,
      guid: true,
    },
    title: {
      type: 'string',
      format: 'text',
      label: 'Title',
    },
    created_at: {
      type: 'date',
      format: 'datetime',
      label: 'Created On',
      readonly: true,
    },
    updated_at: {
      type: 'date',
      format: 'datetime',
      label: 'Updated On',
      readonly: true,
    },
    start: {
      type: 'date',
      format: 'datetime',
      label: 'Scheduled Start',
    },
    end: {
      type: 'date',
      format: 'datetime',
      label: 'Scheduled End',
    },
    description: {
      type: 'string',
      format: 'textarea',
      label: 'Description',
    },
    candidate_id: {
      type: 'lookup',
      guid: true,
      label: 'Candidate',
      entity: EntityName.Candidate,
    },
    application_id: {
      type: 'lookup',
      guid: true,
      label: 'Application',
      entity: EntityName.Application,
    },
    job_id: {
      type: 'lookup',
      guid: true,
      label: 'Job Position',
      entity: EntityName.Job,
    },
    outcome: {
      type: 'choice',
      string: true,
      label: 'Outcome',
      options: [
        {
          value: 'scheduled',
          label: 'Scheduled',
        },
        {
          value: 'cancelled',
          label: 'Cancelled',
        },
        {
          value: 'no-show',
          label: 'No Show',
        },
        {
          value: 'interview-rejected',
          label: 'Interview Rejected',
        },
        {
          value: 'interview-completed',
          label: 'Interview Completed',
        },
      ],
    },
  },
});

export type InterviewAttributes = (typeof interviewSchema)['attributes'];

export type Interview = InferredSchemaType<InterviewAttributes>;
