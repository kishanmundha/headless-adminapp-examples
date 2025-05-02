import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const taskSchema = defineSchema({
  logicalName: 'tasks',
  collectionName: 'sh_tasks',
  label: 'Task',
  pluralLabel: 'Tasks',
  idAttribute: 'id',
  primaryAttribute: 'subject',
  createdAtAttribute: 'createdon',
  updatedAtAttribute: 'updatedon',
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
    status: {
      type: 'choice',
      label: 'Status',
      string: true,
      default: 'open',
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
      ],
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
  },
});

export type TaskAttributes = typeof taskSchema.attributes;

export type Task = InferredSchemaType<TaskAttributes>;
