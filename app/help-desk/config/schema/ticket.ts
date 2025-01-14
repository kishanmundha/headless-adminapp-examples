import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const ticketSchema = defineSchema({
  logicalName: 'tickets',
  label: 'Ticket',
  pluralLabel: 'Tickets',
  idAttribute: 'id',
  primaryAttribute: 'subject',
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
    subject: {
      type: 'string',
      format: 'text',
      label: 'Subject',
    },
    created_at: {
      type: 'date',
      format: 'datetime',
      label: 'Created At',
      readonly: true,
    },
    updated_at: {
      type: 'date',
      format: 'datetime',
      label: 'Updated At',
      readonly: true,
    },
    status: {
      type: 'choice',
      label: 'Status',
      string: true,
      options: [
        {
          label: 'Open',
          value: 'open',
          color: '#d0d0d0', // grey
        },
        {
          label: 'In Progress',
          value: 'in_progress',
          color: '#FFD580', // light orange
        },
        {
          label: 'Resolved',
          value: 'resolved',
          color: '#c2f5da', // green
        },
      ],
    },
    customer_id: {
      type: 'lookup',
      guid: true,
      label: 'Customer',
      entity: 'customers',
      searchable: true,
    },
    product_id: {
      type: 'lookup',
      guid: true,
      label: 'Product',
      entity: 'products',
      searchable: true,
    },
    agent_id: {
      type: 'lookup',
      guid: true,
      label: 'Agent',
      entity: 'agents',
      searchable: true,
    },
    messages: {
      type: 'number',
      format: 'integer',
      label: 'Messages',
      required: true,
    },
    category: {
      type: 'choice',
      label: 'Category',
      string: true,
      options: [
        {
          value: 'cooling',
          label: 'Cooling',
          color: '#B0E0E6', // light blue
        },
        {
          value: 'noise',
          label: 'Noise',
          color: '#FFFACD', // light gold
        },
        {
          value: 'light',
          label: 'Light',
          color: '#FFA07A', // light salmon
        },
        {
          value: 'power',
          label: 'Power',
          color: '#FF7F50', // light tomato
        },
        {
          value: 'warranty',
          label: 'Warranty',
          color: '#20B2AA', // light sea green
        },
        {
          value: 'setup',
          label: 'Setup',
          color: '#FFA500', // light orange
        },
        {
          value: 'billing',
          label: 'Billing',
          color: '#FFDAB9', // peach puff
        },
        {
          value: 'parts',
          label: 'Parts',
          color: '#FF69B4', // light pink
        },
        {
          value: 'maintenance',
          label: 'Maintenance',
          color: '#FFB6C1', // light pink
        },
        {
          value: 'other',
          label: 'Other',
          color: '#FFB6C1', // light pink
        },
      ],
    },
  },
});

export type TicketAttributes = (typeof ticketSchema)['attributes'];

export type Ticket = InferredSchemaType<TicketAttributes>;
