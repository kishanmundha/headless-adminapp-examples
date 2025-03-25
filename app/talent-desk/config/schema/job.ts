import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const jobSchema = defineSchema({
  logicalName: EntityName.Job,
  collectionName: 'td_jobs',
  label: 'Job',
  pluralLabel: 'Jobs',
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
    description: {
      type: 'string',
      format: 'textarea',
      label: 'Description',
    },
    location: {
      type: 'choice',
      string: true,
      label: 'Location',
      options: [
        { value: 'remote', label: 'Remote' },
        { value: 'onsite', label: 'Onsite' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
    salaryMin: {
      type: 'money',
      label: 'Minimum Salary',
    },
    salaryMax: {
      type: 'money',
      label: 'Maximum Salary',
    },
    department: {
      type: 'string',
      format: 'text',
      label: 'Department',
    },
    type: {
      type: 'choice',
      label: 'Job Type',
      string: true,
      options: [
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' },
      ],
    },
    status: {
      type: 'choice',
      label: 'Status',
      string: true,
      options: [
        { value: 'open', label: 'Open', color: '#107c10' },
        { value: 'closed', label: 'Closed', color: '#c50f1f' },
      ],
    },
  },
});

export type JobAttributes = (typeof jobSchema)['attributes'];

export type Job = InferredSchemaType<JobAttributes>;
