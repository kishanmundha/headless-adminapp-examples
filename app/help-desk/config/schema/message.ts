import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const messageSchema = defineSchema({
  logicalName: EntityName.Message,
  collectionName: 'hd_messages',
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
      entity: EntityName.Ticket,
    },
    customer_id: {
      type: 'lookup',
      label: 'Customer',
      guid: true,
      entity: EntityName.Customer,
      behavior: 'dependent',
    },
    agent_id: {
      type: 'lookup',
      label: 'Agent',
      guid: true,
      entity: EntityName.Agent,
    },
  },
});

export type MessageAttributes = (typeof messageSchema)['attributes'];

export type Message = InferredSchemaType<MessageAttributes>;
