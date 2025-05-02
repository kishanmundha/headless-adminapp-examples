import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const appointmentSchema = defineSchema({
  logicalName: 'appointments',
  collectionName: 'sh_appointments',
  label: 'Appointment',
  pluralLabel: 'Appointments',
  idAttribute: 'id',
  primaryAttribute: 'title',
  createdAtAttribute: 'created_on',
  updatedAtAttribute: 'updated_on',
  attributes: {
    id: {
      type: 'id',
      label: 'ID',
      readonly: true,
      guid: true,
      required: true,
    },
    title: {
      type: 'string',
      format: 'text',
      label: 'Title',
      required: true,
    },
    created_on: {
      type: 'date',
      format: 'datetime',
      label: 'Created At',
      readonly: true,
      systemDefined: true,
    },
    updated_on: {
      type: 'date',
      format: 'datetime',
      label: 'Updated At',
      readonly: true,
      systemDefined: true,
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
    status: {
      type: 'choice',
      label: 'Status',
      string: true,
      default: 'open',
      options: [
        {
          label: 'Scheduled',
          value: 'scheduled',
          color: '#fcba03',
        },
        {
          label: 'Completed',
          value: 'completed',
          color: '#119c31',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
          color: '#bad80a',
        },
      ],
    },
    regardingobjectid: {
      type: 'regarding',
      label: 'Regarding',
      guid: true,
      entities: ['deals'],
      entityTypeAttribute: 'regardingobjecttype',
    },
    regardingobjecttype: {
      type: 'string',
      format: 'text',
      label: 'Regarding Type',
      systemDefined: true,
    },
  },
});

export type AppointmentAttributes = typeof appointmentSchema.attributes;

export type Appointment = InferredSchemaType<AppointmentAttributes>;
