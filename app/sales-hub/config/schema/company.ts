import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';

export const companySchema = defineSchema({
  logicalName: 'companies',
  collectionName: 'sh_companies',
  label: 'Company',
  pluralLabel: 'Companies',
  idAttribute: 'id',
  primaryAttribute: 'name',
  createdAtAttribute: 'created_at',
  updatedAtAttribute: 'updated_at',
  avatarAttribute: 'logo',
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
    logo: {
      type: 'attachment',
      format: 'image',
      label: 'Avatar',
    },
    website: {
      type: 'string',
      format: 'url',
      label: 'Website',
    },
    contactNumber: {
      type: 'string',
      format: 'phone',
      label: 'Contact Number',
    },
    sector: {
      type: 'choice',
      label: 'Sector',
      string: true,
      options: [
        {
          value: 'technology',
          label: 'Technology',
        },
        {
          value: 'healthcare',
          label: 'Healthcare',
        },
        {
          value: 'finance',
          label: 'Finance',
        },
        {
          value: 'education',
          label: 'Education',
        },
        {
          value: 'retail',
          label: 'Retail',
        },
        {
          value: 'manufacturing',
          label: 'Manufacturing',
        },
        {
          value: 'transportation',
          label: 'Transportation',
        },
        {
          value: 'energy',
          label: 'Energy',
        },
      ],
    },
    size: {
      type: 'choice',
      label: 'Size',
      string: true,
      options: [
        {
          value: 'small',
          label: 'Small',
        },
        {
          value: 'medium',
          label: 'Medium',
        },
        {
          value: 'large',
          label: 'Large',
        },
        {
          value: 'enterprise',
          label: 'Enterprise',
        },
      ],
    },
    revenue: {
      type: 'money',
      label: 'Revenue',
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
    state: {
      type: 'string',
      format: 'text',
      label: 'State',
    },
    zipcode: {
      type: 'string',
      format: 'text',
      label: 'Zipcode',
    },
    notes: {
      type: 'string',
      format: 'textarea',
      label: 'Notes',
    },
    salesownerid: {
      type: 'lookup',
      label: 'Sales Owner',
      guid: true,
      entity: 'systemusers',
    },
  },
});

export type CompanyAttributes = (typeof companySchema)['attributes'];

export type Company = InferredSchemaType<CompanyAttributes>;
