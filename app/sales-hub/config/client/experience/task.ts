import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { taskSchema } from '../../schema/task';

const builder = new SchemaExperienceBuilder(taskSchema);

export const taskSchemaExperience = builder.defineExperience({
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience([
        'regardingobjectid',
        'subject',
        'scheduledstart',
        'scheduledend',
        'status',
      ]),
    },
  ],
});
