import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const applicationSchema = defineSchema({
  logicalName: EntityName.Application,
  collectionName: 'td_applications',
  label: 'Application',
  pluralLabel: 'Applications',
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
    candidate_id: {
      type: 'lookup',
      label: 'Candidate',
      entity: EntityName.Candidate,
      guid: true,
      required: true,
    },
    job_id: {
      type: 'lookup',
      label: 'Job',
      entity: EntityName.Job,
      guid: true,
      required: true,
    },
    applied_at: {
      type: 'date',
      format: 'datetime',
      label: 'Applied On',
    },
    status: {
      type: 'choice',
      string: true,
      label: 'Status',
      options: [
        { value: 'received', label: 'Received' },
        {
          value: 'shortlisted',
          label: 'Shortlisted',
          color: '#FFC107',
        },
        {
          value: 'rejected',
          label: 'Rejected',
          color: '#F44336',
        },
        {
          value: 'interview-scheduled',
          label: 'Interview Scheduled',
          color: '#FFC107',
        },
        {
          value: 'interview-completed',
          label: 'Interview Completed',
          color: '#FFC107',
        },
        {
          value: 'interview-rejected',
          label: 'Interview Rejected',
          color: '#F44336',
        },
        {
          value: 'offered',
          label: 'Offered',
          color: '#00C853',
        },
        {
          value: 'offer-accepted',
          label: 'Offer Accepted',
          color: '#00C853',
        },
        {
          value: 'offer-rejected',
          label: 'Offer Rejected',
          color: '#F44336',
        },
        {
          value: 'hired',
          label: 'Hired',
          color: '#00C853',
        },
        {
          value: 'on-hold',
          label: 'On Hold',
          color: '#FFC107',
        },
      ],
    },
    archived: {
      type: 'boolean',
      label: 'Archived',
    },
  },
});

export type ApplicationAttributes = (typeof applicationSchema)['attributes'];

export type Application = InferredSchemaType<ApplicationAttributes>;
