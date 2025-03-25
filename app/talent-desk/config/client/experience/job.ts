import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { jobSchema } from '../../schema/job';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(jobSchema);

const JobIcon = bundleLazyIcon('Briefcase24Regular', 'Briefcase24Filled');

const defaultViewExperience = builder.defineViewExperience({
  grid: [
    'title',
    'department',
    'location',
    'type',
    'status',
    'salaryMin',
    'salaryMax',
  ],
  card: {
    primaryColumn: 'title',
    secondaryColumns: [{ name: 'department' }],
    rightColumn: [{ name: 'status', variant: 'choice' }],
  },
});

export const jobSchemaExperience = builder.defineExperience({
  Icon: JobIcon,
  defaultViewId: 'all-jobs',
  defaultLookupId: 'default',
  views: [
    {
      id: 'active-jobs',
      name: 'Active Jobs',
      experience: builder.defineViewExperience({
        ...defaultViewExperience,
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'status',
              operator: 'eq',
              value: 'open',
            },
          ],
        },
      }),
    },
    {
      id: 'all-jobs',
      name: 'All Jobs',
      experience: builder.defineViewExperience({
        ...defaultViewExperience,
      }),
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience({
        headerControls: ['created_at'],
        tabs: [
          {
            name: 'general',
            label: 'General',
            controls: [
              'title',
              'department',
              'location',
              'type',
              'status',
              'salaryMin',
              'salaryMax',
            ],
          },
        ],
      }),
    },
  ],
});
