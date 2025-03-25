import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const offerSchema = defineSchema({
  logicalName: EntityName.Offer,
  collectionName: 'td_offers',
  label: 'Offer',
  pluralLabel: 'Offers',
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
    application_id: {
      type: 'lookup',
      label: 'Application',
      entity: EntityName.Application,
      guid: true,
    },
    offered_at: {
      type: 'date',
      format: 'datetime',
      label: 'Offered On',
    },
    salary: {
      type: 'money',
      label: 'Salary',
    },
    joining_date: {
      type: 'date',
      format: 'date',
      label: 'Joining Date',
    },
    status: {
      type: 'choice',
      string: true,
      label: 'Status',
      options: [
        {
          value: 'pending',
          label: 'Pending',
          color: '#FFC107', // warning color
        },
        {
          value: 'accepted',
          label: 'Accepted',
          color: '#4CAF50', // accepted color
        },
        {
          value: 'rejected',
          label: 'Rejected',
          color: '#F44336', // rejected color
        },
      ],
    },
  },
});

export type OfferAttributes = (typeof offerSchema)['attributes'];

export type Offer = InferredSchemaType<OfferAttributes>;
