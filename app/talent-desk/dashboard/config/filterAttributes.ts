import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchemaAttributes } from '@headless-adminapp/core/schema/utils';
import { EntityName } from '../../config/enums';

export const filterAttributes = defineSchemaAttributes({
  job_id: {
    type: 'lookup',
    label: 'Job',
    guid: true,
    entity: EntityName.Job,
  },
});

export type FilterAttributes = typeof filterAttributes;
export type FilterValues = InferredSchemaType<FilterAttributes>;
