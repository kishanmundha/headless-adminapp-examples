import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { userSchema } from '../../schema/user';

const builder = new SchemaExperienceBuilder(userSchema);

export const userSchemaExperience = builder.defineExperience({});
