import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const systemUserSchema = defineSchema({
  logicalName: 'systemusers',
  collectionName: 'sh_systemusers',
  label: 'User',
  pluralLabel: 'Users',
  idAttribute: 'id',
  primaryAttribute: 'fullName',
  createdAtAttribute: 'createdAt',
  updatedAtAttribute: 'updatedAt',
  avatarAttribute: 'avatar',
  ownership: 'global',
  attributes: {
    id: {
      type: 'id',
      label: 'Id',
      required: true,
      readonly: true,
      guid: true,
    },
    fullName: {
      type: 'string',
      format: 'text',
      label: 'Name',
    },
    firstName: {
      type: 'string',
      format: 'text',
      label: 'First Name',
    },
    lastName: {
      type: 'string',
      format: 'text',
      label: 'Last Name',
    },
    createdAt: {
      type: 'date',
      format: 'datetime',
      label: 'Created At',
      readonly: true,
    },
    updatedAt: {
      type: 'date',
      format: 'datetime',
      label: 'Updated At',
      readonly: true,
    },
    email: {
      type: 'string',
      format: 'email',
      label: 'Email',
    },
    avatar: {
      type: 'attachment',
      format: 'image',
      label: 'Avatar',
    },
  },
});

export type SystemUserAttributes = (typeof systemUserSchema)['attributes'];

export type SystemUser = InferredSchemaType<SystemUserAttributes>;
