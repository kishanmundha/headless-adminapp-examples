import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const messageSchema = defineSchema({
  logicalName: 'messages',
  label: 'Message',
  pluralLabel: 'Messages',
  idAttribute: 'id',
  primaryAttribute: 'message',
  createdAtAttribute: 'timestamp',
  ownership: 'scoped',
  attributes: {
    id: {
      type: 'id',
      label: 'Id',
      required: true,
      readonly: true,
      guid: true,
    },
    message: {
      type: 'string',
      format: 'textarea',
      label: 'Message',
    },
    timestamp: {
      type: 'date',
      format: 'datetime',
      label: 'Created At',
      readonly: true,
    },
    ticket_id: {
      type: 'lookup',
      label: 'Ticket',
      guid: true,
      entity: 'tickets',
    },
    customer_id: {
      type: 'lookup',
      label: 'Customer',
      guid: true,
      entity: 'customers',
      behavior: 'dependent',
    },
    agent_id: {
      type: 'lookup',
      label: 'Agent',
      guid: true,
      entity: 'agents',
    },
  },
});

export type MessageAttributes = (typeof messageSchema)['attributes'];

export type Message = InferredSchemaType<MessageAttributes>;
