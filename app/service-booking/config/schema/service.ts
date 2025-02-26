import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const serviceSchema = defineSchema({
  logicalName: EntityName.Service,
  collectionName: 'sb_services',
  label: 'Service',
  pluralLabel: 'Services',
  idAttribute: 'id',
  primaryAttribute: 'name',
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
    name: {
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
  },
});

export type ServiceAttributes = (typeof serviceSchema)['attributes'];

export type Service = InferredSchemaType<ServiceAttributes>;
