import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const noteSchema = defineSchema({
  logicalName: 'notes',
  collectionName: 'sh_notes',
  label: 'Note',
  pluralLabel: 'Notes',
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
    notetext: {
      type: 'string',
      format: 'textarea',
      label: 'Note',
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

export type NoteAttributes = typeof noteSchema.attributes;

export type Note = InferredSchemaType<NoteAttributes>;
