import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const activitySchema = defineSchema({
  logicalName: 'activities',
  collectionName: 'sh_activities',
  label: 'Activity',
  pluralLabel: 'Activities',
  idAttribute: 'id',
  primaryAttribute: 'subject',
  createdAtAttribute: 'createdon',
  updatedAtAttribute: 'updatedon',
  virtual: true,
  virtualLogicalNameAttribute: 'activitytype',
  baseSchemaLogicalNames: ['tasks', 'appointments'],
  attributes: {
    id: {
      type: 'id',
      label: 'ID',
      readonly: true,
      guid: true,
      required: true,
    },
    subject: {
      type: 'string',
      format: 'text',
      label: 'Title',
      required: true,
    },
    createdon: {
      type: 'date',
      format: 'datetime',
      label: 'Created At',
      readonly: true,
      systemDefined: true,
    },
    updatedon: {
      type: 'date',
      format: 'datetime',
      label: 'Updated At',
      readonly: true,
      systemDefined: true,
    },
    activitytype: {
      type: 'choice',
      label: 'Activity Type',
      systemDefined: true,
      string: true,
      options: [
        {
          value: 'tasks',
          label: 'Task',
        },
        {
          value: 'appointments',
          label: 'Appointment',
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
    scheduledstart: {
      type: 'date',
      format: 'datetime',
      label: 'Scheduled Start',
    },
    scheduledend: {
      type: 'date',
      format: 'datetime',
      label: 'Scheduled End',
    },
    status: {
      type: 'choice',
      label: 'Status',
      string: true,
      options: [
        {
          label: 'TODO',
          value: 'todo',
          color: '#e3e3e3',
        },
        {
          label: 'Completed',
          value: 'completed',
          color: '#119c31',
        },
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
  },
});

export type ActivityAttributes = typeof activitySchema.attributes;

export type Activity = InferredSchemaType<ActivityAttributes>;
