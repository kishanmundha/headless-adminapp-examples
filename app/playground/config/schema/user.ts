import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const userSchema = defineSchema({
  logicalName: 'users',
  label: 'Users',
  pluralLabel: 'Users',
  idAttribute: '_id',
  primaryAttribute: 'name',
  attributes: {
    _id: {
      type: 'id',
      string: true,
      label: 'ID',
    },
    name: {
      type: 'string',
      format: 'text',
      label: 'Name',
    },
  },
});
