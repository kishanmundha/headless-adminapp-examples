import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { productSchema } from '../schema/product';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const ProductIcon = bundleLazyIcon('Production24Regular', 'Production24Filled');

const builder = new SchemaExperienceBuilder(productSchema);

export const productSchemaExperience = builder.defineExperience({
  icon: ProductIcon,
  views: [
    {
      id: 'default',
      name: 'All Products',
      experience: builder.defineViewExperience({
        defaultSorting: [
          {
            field: 'updatedAt',
            order: 'desc',
          },
        ],
        grid: {
          columns: [
            {
              name: 'model',
            },
            {
              name: 'customers',
              width: 50,
              maxWidth: 50,
            },
            {
              name: 'tickets',
              width: 50,
              maxWidth: 50,
            },
            {
              name: 'createdAt',
            },
            {
              name: 'updatedAt',
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
                        attributeName: 'model',
                      },
                    ],
                  },
                ],
              },
              {
                sections: [
                  {
                    name: 'general',
                    label: 'General',
                    hideLabel: true,
                    noPadding: true,
                    controls: [
                      {
                        type: 'subgrid',
                        logicalName: 'customers',
                        associatedAttribute: 'product_id',
                        viewId: 'default',
                        label: 'Customers',
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
