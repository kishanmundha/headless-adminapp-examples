import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const timelineSchema = defineSchema({
  logicalName: 'timelines',
  collectionName: 'sh_timelines',
  label: 'Timeline',
  pluralLabel: 'Timelines',
  idAttribute: 'id',
  primaryAttribute: 'subject',
  createdAtAttribute: 'createdon',
  updatedAtAttribute: 'updatedon',
  virtual: true,
  virtualLogicalNameAttribute: 'timelinetype',
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
    timelinetype: {
      type: 'string',
      format: 'text',
      label: 'Timeline Type',
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
    notetext: {
      type: 'string',
      format: 'text',
      label: 'Note',
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
      type: 'string',
      format: 'text',
      label: 'Status',
    },
  },
});

export type TimelineAttributes = typeof timelineSchema.attributes;

export type Timeline = InferredSchemaType<TimelineAttributes>;
