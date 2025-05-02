import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { systemUserSchema } from '../../schema/systemuser';

const builder = new SchemaExperienceBuilder(systemUserSchema);

export const systemUserSchemaExperience = builder.defineExperience({});
