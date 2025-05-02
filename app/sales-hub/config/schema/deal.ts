import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const dealSchema = defineSchema({
  logicalName: 'deals',
  collectionName: 'sh_deals',
  label: 'Deal',
  pluralLabel: 'Deals',
  idAttribute: 'id',
  primaryAttribute: 'title',
  createdAtAttribute: 'createdAt',
  updatedAtAttribute: 'updatedAt',
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
    createdAt: {
      type: 'date',
      format: 'datetime',
      label: 'Created At',
      readonly: true,
    },
    updatedAt: {
      type: 'date',
      format: 'datetime',
      label: 'Updated At',
      readonly: true,
    },
    description: {
      type: 'string',
      format: 'textarea',
      label: 'Description',
    },
    companyid: {
      type: 'lookup',
      label: 'Company',
      entity: 'companies',
      guid: true,
    },
    category: {
      type: 'choice',
      label: 'Category',
      string: true,
      options: [
        {
          value: 'printing',
          label: 'Printing',
        },
        {
          value: 'design',
          label: 'Design',
        },
        {
          value: 'development',
          label: 'Development',
        },
        {
          value: 'marketing',
          label: 'Marketing',
        },
      ],
    },
    amount: {
      type: 'money',
      label: 'Amount',
    },
    expectedCloseDate: {
      type: 'date',
      format: 'date',
      label: 'Expected Close Date',
    },
    contactid: {
      type: 'lookup',
      label: 'Contact',
      entity: 'contacts',
      guid: true,
    },
    salesownerid: {
      type: 'lookup',
      label: 'Sales Owner',
      entity: 'systemusers',
      guid: true,
    },
    stage: {
      type: 'choice',
      label: 'Stage',
      string: true,
      options: [
        {
          value: 'opportunity',
          label: 'Opportunity',
        },
        {
          value: 'proposal',
          label: 'Proposal',
          color: '#FFA500', // Orange
        },
        {
          value: 'negotiation',
          label: 'Negotiation',
          color: '#FFA500', // Orange
        },
        {
          value: 'won',
          label: 'Won',
          color: '#008000', // Green
        },
        {
          value: 'lost',
          label: 'Lost',
          color: '#FF0000', // Red
        },
      ],
    },
  },
});

export type DealAttributes = (typeof dealSchema)['attributes'];

export type Deal = InferredSchemaType<DealAttributes>;
