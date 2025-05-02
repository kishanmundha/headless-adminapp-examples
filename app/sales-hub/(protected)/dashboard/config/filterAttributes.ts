import { dealSchema } from '@/app/sales-hub/config/schema/deal';
import { InferredSchemaType } from '@headless-adminapp/core/schema';
import { defineSchemaAttributes } from '@headless-adminapp/core/schema/utils';

export const filterAttributes = defineSchemaAttributes({
  category: {
    ...dealSchema.attributes.category,
    type: 'choices',
  },
});

export type FilterAttributes = typeof filterAttributes;
export type FilterValues = InferredSchemaType<FilterAttributes>;
