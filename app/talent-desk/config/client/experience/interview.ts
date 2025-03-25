import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { interviewSchema } from '../../schema/interview';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import dayjs from 'dayjs';

const builder = new SchemaExperienceBuilder(interviewSchema);

const InterviewIcon = bundleLazyIcon(
  'CalendarClock24Regular',
  'CalendarClock24Filled'
);

const defaultViewExperience = builder.defineViewExperience({
  grid: ['title', 'candidate_id', 'job_id', 'start', 'end'],
});

export const interviewSchemaExperience = builder.defineExperience({
  Icon: InterviewIcon,
  views: [
    {
      id: 'default',
      name: 'Upcoming Interviews',
      experience: builder.defineViewExperience({
        ...defaultViewExperience,
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'start',
              operator: 'on-or-after',
              value: dayjs().format('YYYY-MM-DD'),
            },
          ],
        },
        defaultSorting: [
          {
            field: 'start',
            order: 'asc',
          },
        ],
      }),
    },
    {
      id: 'all-interviews',
      name: 'All Interviews',
      experience: builder.defineViewExperience({
        ...defaultViewExperience,
        defaultSorting: [
          {
            field: 'start',
            order: 'desc',
          },
        ],
      }),
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience({
        tabs: [
          {
            name: 'general',
            label: 'General',
            controls: [
              'title',
              'candidate_id',
              'job_id',
              'start',
              'end',
              'description',
              'outcome',
            ],
          },
        ],
      }),
    },
  ],
});
