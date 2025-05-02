import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { timelineSchema } from '../../schema/timeline';

const builder = new SchemaExperienceBuilder(timelineSchema);

export const timelineSchemaExperience = builder.defineExperience({
  views: [
    {
      id: 'default',
      name: 'All Timelines',
      experience: builder.defineViewExperience({
        grid: ['subject', 'regardingobjectid'],
      }),
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience([
        'subject',
        'regardingobjectid',
      ]),
    },
  ],
});
