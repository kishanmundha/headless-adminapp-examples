import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { agentSchema } from '../schema/agent';

const builder = new SchemaExperienceBuilder(agentSchema);

export const agentSchemaExperience = builder.defineExperience({});
