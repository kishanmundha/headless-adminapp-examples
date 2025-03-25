import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { applicationSchema } from '../../schema/application';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(applicationSchema);

const ApplicationIcon = bundleLazyIcon(
  'NotepadPerson24Regular',
  'NotepadPerson24Filled'
);

const defaultCardView = builder.defineViewExperience({
  card: {
    primaryColumn: 'candidate_id',
    secondaryColumns: [{ name: 'job_id' }],
    rightColumn: [{ name: 'status', variant: 'choice' }],
  },
}).card;

export const applicationSchemaExperience = builder.defineExperience({
  Icon: ApplicationIcon,
  defaultViewId: 'active-applications',
  views: [
    {
      id: 'active-applications',
      name: 'Active Applications',
      experience: builder.defineViewExperience({
        grid: [
          { name: 'title', label: 'Candidate' },
          { name: 'candidate_id', expandedKey: 'email' },
          'job_id',
          'applied_at',
          { name: 'status', maxWidth: 200 },
        ],
        card: defaultCardView,
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'status',
              operator: 'in',
              value: [
                'received',
                'shortlisted',
                'interview-scheduled',
                'interview-completed',
                'interview-no-show',
                'offered',
                'offer-accepted',
                'hired',
              ],
            },
          ],
        },
      }),
    },
    {
      id: 'all-applications',
      name: 'All Applications',
      experience: builder.defineViewExperience({
        grid: ['candidate_id', 'job_id', 'status'],
        card: defaultCardView,
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
            controls: ['job_id', 'candidate_id', 'status'],
          },
        ],
      }),
    },
  ],
});
