import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const customerSchema = defineSchema({
  logicalName: 'customers',
  label: 'Customer',
  pluralLabel: 'Customers',
  idAttribute: 'id',
  primaryAttribute: 'fullName',
  createdAtAttribute: 'created_at',
  updatedAtAttribute: 'updated_at',
  avatarAttribute: 'avatar',
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
    product_id: {
      type: 'lookup',
      guid: true,
      label: 'Product',
      entity: 'products',
    },
    phone: {
      type: 'string',
      format: 'phone',
      label: 'Phone',
    },
    address: {
      type: 'string',
      format: 'text',
      label: 'Address',
    },
    city: {
      type: 'string',
      format: 'text',
      label: 'City',
    },
    zipCode: {
      type: 'string',
      format: 'text',
      label: 'Zip Code',
    },
    state: {
      type: 'string',
      format: 'text',
      label: 'State',
    },
    tickets: {
      type: 'number',
      format: 'integer',
      label: 'Tickets',
      required: true,
    },
    openTickets: {
      type: 'number',
      format: 'integer',
      label: 'Open Tickets',
      required: true,
    },
  },
});

export type CustomerAttributes = (typeof customerSchema)['attributes'];

export type Customer = InferredSchemaType<CustomerAttributes>;
