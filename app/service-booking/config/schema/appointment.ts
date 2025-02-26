import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const appointmentSchema = defineSchema({
  logicalName: EntityName.Appointment,
  collectionName: 'sb_appointments',
  label: 'Appointment',
  pluralLabel: 'Appointments',
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
      label: 'Created At',
      readonly: true,
    },
    updated_at: {
      type: 'date',
      format: 'datetime',
      label: 'Updated At',
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
    allDay: {
      type: 'boolean',
      label: 'All Day',
    },
    description: {
      type: 'string',
      format: 'textarea',
      label: 'Description',
    },
    customer_id: {
      type: 'lookup',
      guid: true,
      label: 'Customer',
      entity: EntityName.Customer,
    },
    agent_id: {
      type: 'lookup',
      guid: true,
      label: 'Agent',
      entity: EntityName.User,
    },
  },
});

export type AppointmentAttributes = (typeof appointmentSchema)['attributes'];

export type Appointment = InferredSchemaType<AppointmentAttributes>;
