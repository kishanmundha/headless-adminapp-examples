import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { appointmentSchema } from '../../schema/appointment';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(appointmentSchema);

const AppointmentIcon = bundleLazyIcon('Book24Regular', 'Book24Filled');

const defaultViewExperience = builder.defineViewExperience({
  grid: ['title', 'customer_id', 'start', 'end'],
});

export const appointmentSchemaExperience = builder.defineExperience({
  icon: AppointmentIcon,
  views: [
    {
      id: 'default',
      name: 'Upcoming Appointments',
      experience: {
        ...defaultViewExperience,
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'start',
              operator: 'on-or-after',
              value: new Date().toISOString(),
            },
          ],
        },
        defaultSorting: [
          {
            field: 'start',
            order: 'asc',
          },
        ],
      },
    },
    {
      id: 'all-appointments',
      name: 'All Appointments',
      experience: {
        ...defaultViewExperience,
        defaultSorting: [
          {
            field: 'start',
            order: 'desc',
          },
        ],
      },
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Appointment',
      experience: builder.defineFormExperience({
        tabs: [
          {
            columnCount: 2,
            label: 'General',
            name: 'general',
            controls: [
              'title',
              'start',
              'end',
              'allDay',
              'agent_id',
              'customer_id',
              'description',
            ],
          },
        ],
      }),
    },
  ],
});
