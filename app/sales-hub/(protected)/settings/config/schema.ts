import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const settingSchema = defineSchema({
  logicalName: 'settings',
  label: 'Setting',
  pluralLabel: 'Settings',
  idAttribute: '_id',
  primaryAttribute: 'name',
  attributes: {
    _id: {
      type: 'id',
      label: 'ID',
      objectId: true,
    },
    name: {
      type: 'string',
      format: 'text',
      label: 'Name',
    },
    notification: {
      type: 'boolean',
      label: 'Notification',
    },
  },
});

export type SettingAttributes = typeof settingSchema.attributes;

export type Setting = InferredSchemaType<SettingAttributes>;
