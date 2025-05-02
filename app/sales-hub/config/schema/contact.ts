import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const contactSchema = defineSchema({
  logicalName: 'contacts',
  collectionName: 'sh_contacts',
  label: 'Contact',
  pluralLabel: 'Contacts',
  idAttribute: 'id',
  primaryAttribute: 'fullName',
  avatarAttribute: 'avatar',
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
    fullName: {
      type: 'string',
      format: 'text',
      label: 'Name',
      required: true,
    },
    firstName: {
      type: 'string',
      format: 'text',
      label: 'First Name',
      required: true,
    },
    lastName: {
      type: 'string',
      format: 'text',
      label: 'Last Name',
      required: true,
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
    email: {
      type: 'string',
      format: 'email',
      label: 'Email',
    },
    phone: {
      type: 'string',
      format: 'phone',
      label: 'Phone',
    },
    avatar: {
      type: 'attachment',
      format: 'image',
      label: 'Avatar',
    },
    companyid: {
      type: 'lookup',
      label: 'Company',
      guid: true,
      entity: 'companies',
    },
  },
});

export type ContactAttributes = (typeof contactSchema)['attributes'];

export type Contact = InferredSchemaType<ContactAttributes>;
