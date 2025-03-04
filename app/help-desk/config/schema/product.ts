import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const productSchema = defineSchema({
  logicalName: EntityName.Product,
  collectionName: 'hd_products',
  label: 'Product',
  pluralLabel: 'Products',
  idAttribute: 'id',
  primaryAttribute: 'model',
  createdAtAttribute: 'createdAt',
  updatedAtAttribute: 'updatedAt',
  ownership: 'scoped',
  attributes: {
    id: {
      type: 'id',
      label: 'Id',
      required: true,
      readonly: true,
      guid: true,
    },
    model: {
      type: 'string',
      format: 'text',
      label: 'Name',
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
    tickets: {
      type: 'number',
      format: 'integer',
      label: 'Tickets',
      required: true,
      default: 0,
    },
    customers: {
      type: 'number',
      format: 'integer',
      label: 'Customers',
      required: true,
      default: 0,
    },
  },
});

export type ProductAttributes = (typeof productSchema)['attributes'];

export type Product = InferredSchemaType<ProductAttributes>;
