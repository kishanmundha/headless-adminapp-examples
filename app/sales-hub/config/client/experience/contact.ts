import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { contactSchema } from '../../schema/contact';
import { bundleLazyIcon } from '@/packages/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(contactSchema);

const Icon = bundleLazyIcon('Person24Regular', 'Person24Filled');

export const contactSchemaExperience = builder.defineExperience({
  Icon,
  views: [
    {
      id: 'default',
      name: 'All Contacts',
      experience: builder.defineViewExperience({
        grid: ['fullName', 'email', 'phone', 'companyid'],
      }),
    },
  ],
  associatedViews: [
    {
      id: 'default',
      name: 'Contacts',
      experience: builder.defineViewExperience({
        grid: ['fullName', 'email', 'phone'],
      }),
    },
  ],
});
