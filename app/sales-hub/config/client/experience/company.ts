import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { companySchema } from '../../schema/company';
import { defineSectionEditableGridControl } from '@headless-adminapp/core/experience/form/utils';
import { ContactAttributes } from '../../schema/contact';
import { bundleLazyIcon } from '@/packages/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(companySchema);

const Icon = bundleLazyIcon('Building24Regular', 'Building24Filled');

export const companySchemaExperience = builder.defineExperience({
  Icon,
  views: [
    {
      id: 'default',
      name: 'All Companies',
      experience: builder.defineViewExperience({
        grid: [
          'name',
          'contactNumber',
          'website',
          'salesownerid',
          'city',
          'size',
          'revenue',
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
            columnCount: 2,
            tabColumns: [
              {
                sections: [
                  {
                    name: 'basic',
                    label: 'Basic Information',
                    controls: ['name', 'sector', 'size', 'revenue', 'notes'],
                  },
                  {
                    name: 'contact',
                    label: 'Contact Information',
                    controls: [
                      'website',
                      'contactNumber',
                      'address',
                      'city',
                      'state',
                      'zipcode',
                    ],
                  },
                ],
              },
              {
                sections: [
                  // {
                  //   name: 'contact',
                  //   label: 'Contacts',
                  //   hideLabel: true,
                  //   noPadding: true,
                  //   controls: [
                  //     {
                  //       type: 'subgrid',
                  //       associatedAttribute: 'companyid',
                  //       logicalName: 'contacts',
                  //       label: 'Contacts',
                  //     },
                  //   ],
                  // },
                  {
                    name: 'contact',
                    label: 'Contacts',
                    hideLabel: true,
                    noPadding: true,
                    controls: [
                      defineSectionEditableGridControl<ContactAttributes>({
                        alias: false, // 'contacts',
                        logicalName: 'contacts',
                        controls: ['firstName', 'lastName'],
                        format: 'grid',
                        label: 'Contacts',
                        associatedAttribute: 'companyid',
                        summary: [
                          {
                            attribute: 'fullName',
                            type: 'count',
                          },
                        ],
                      }),
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    },
  ],
});
