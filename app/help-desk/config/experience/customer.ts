import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { customerSchema } from '../schema/customer';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const UserIcon = bundleLazyIcon('Person24Regular', 'Person24Filled');

const builder = new SchemaExperienceBuilder(customerSchema);

export const customerSchemaExperience = builder.defineExperience({
  Icon: UserIcon,
  views: [
    {
      id: 'default',
      name: 'All Customers',
      experience: builder.defineViewExperience({
        defaultSorting: [
          {
            field: 'updated_at',
            order: 'desc',
          },
        ],
        grid: {
          columns: [
            {
              name: 'fullName',
            },
            {
              name: 'email',
            },
            {
              name: 'phone',
            },
            {
              name: 'city',
            },
            {
              name: 'product_id',
            },
            {
              name: 'tickets',
            },
            {
              name: 'created_at',
            },
            {
              name: 'updated_at',
            },
          ],
        },
      }),
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience({
        headerControls: ['created_at', 'updated_at'],
        includeAttributes: ['fullName'],
        tabs: [
          {
            columnCount: 2,
            name: 'general',
            label: 'General',
            tabColumns: [
              {
                sections: [
                  {
                    name: 'general',
                    label: 'General',
                    controls: [
                      {
                        type: 'standard',
                        attributeName: 'firstName',
                      },
                      {
                        type: 'standard',
                        attributeName: 'lastName',
                      },
                      {
                        type: 'standard',
                        attributeName: 'product_id',
                      },
                      {
                        type: 'standard',
                        attributeName: 'email',
                      },
                      {
                        type: 'standard',
                        attributeName: 'phone',
                      },
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
