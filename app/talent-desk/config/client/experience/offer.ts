import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { offerSchema } from '../../schema/offer';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(offerSchema);

const OfferIcon = bundleLazyIcon(
  'MailTemplate24Regular',
  'MailTemplate24Filled'
);

export const offerSchemaExperience = builder.defineExperience({
  Icon: OfferIcon,
  views: [
    {
      id: 'default',
      name: 'All Offers',
      experience: builder.defineViewExperience({
        grid: [
          'title',
          'candidate_id',
          'job_id',
          'offered_at',
          'salary',
          'joining_date',
          'status',
        ],
        defaultSorting: [
          {
            field: 'offered_at',
            order: 'desc',
          },
        ],
      }),
    },
  ],
});
