import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { userSchema } from '../../schema/user';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(userSchema);

const UserIcon = bundleLazyIcon('Person24Regular', 'Person24Filled');

export const jobSchemaExperience = builder.defineExperience({
  Icon: UserIcon,
});
