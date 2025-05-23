import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const userSchema = defineSchema({
  logicalName: EntityName.User,
  collectionName: 'sb_users',
  label: 'User',
  pluralLabel: 'Users',
  idAttribute: 'id',
  primaryAttribute: 'fullName',
  createdAtAttribute: 'createdAt',
  updatedAtAttribute: 'updatedAt',
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

export type UserAttributes = (typeof userSchema)['attributes'];

export type User = InferredSchemaType<UserAttributes>;
