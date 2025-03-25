import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { candidateSchema } from '../../schema/candidate';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(candidateSchema);

const CandidateIcon = bundleLazyIcon('Person24Regular', 'Person24Filled');

export const candidateSchemaExperience = builder.defineExperience({
  Icon: CandidateIcon,
  defaultViewId: 'all-candidates',
  views: [
    {
      id: 'all-candidates',
      name: 'All Candidates',
      experience: builder.defineViewExperience({
        grid: ['fullName', 'email', 'phone'],
        card: {
          primaryColumn: 'fullName',
          secondaryColumns: [{ name: 'phone' }],
          showAvatar: true,
        },
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
            controls: ['fullName', 'email', 'phone'],
          },
        ],
      }),
    },
  ],
});
