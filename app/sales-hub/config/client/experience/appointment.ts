import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { appointmentSchema } from '../../schema/appointment';

const EventIcon = bundleLazyIcon('Book24Regular', 'Book24Regular');

const builder = new SchemaExperienceBuilder(appointmentSchema);

export const appointmentSchemaExperience = builder.defineExperience({
  Icon: EventIcon,
  views: [
    {
      id: 'default',
      name: 'All Appointments',
      experience: builder.defineViewExperience({
        grid: [
          'title',
          'regardingobjectid',
          'start',
          'end',
          { name: 'status', maxWidth: 150 },
        ],
      }),
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience([
        'title',
        'regardingobjectid',
        'start',
        'end',
        'description',
        'status',
      ]),
    },
  ],
});
