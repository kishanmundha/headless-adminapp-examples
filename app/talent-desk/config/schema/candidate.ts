import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchema } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../enums';

export const candidateSchema = defineSchema({
  logicalName: EntityName.Candidate,
  collectionName: 'td_candidates',
  label: 'Candidate',
  pluralLabel: 'Candidates',
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
    created_at: {
      type: 'date',
      format: 'datetime',
      label: 'Created On',
      readonly: true,
    },
    updated_at: {
      type: 'date',
      format: 'datetime',
      label: 'Updated On',
      readonly: true,
    },
    avatar: {
      type: 'attachment',
      format: 'image',
      label: 'Profile Image',
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
    experience: {
      // in months
      type: 'number',
      format: 'integer',
      label: 'Experience',
    },
  },
});

export type CandidateAttributes = (typeof candidateSchema)['attributes'];

export type Candidate = InferredSchemaType<CandidateAttributes>;
