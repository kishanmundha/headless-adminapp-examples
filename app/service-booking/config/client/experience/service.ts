import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { serviceSchema } from '../../schema/service';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const ProductIcon = bundleLazyIcon('Production24Regular', 'Production24Filled');

const builder = new SchemaExperienceBuilder(serviceSchema);

export const serviceSchemaExperience = builder.defineExperience({
  icon: ProductIcon,
});
