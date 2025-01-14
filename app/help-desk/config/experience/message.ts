import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { messageSchema } from '../schema/message';

const builder = new SchemaExperienceBuilder(messageSchema);

export const messageSchemaExperience = builder.defineExperience({
  associatedViews: [
    {
      id: 'default',
      name: 'Messages',
      experience: builder.defineViewExperience({
        defaultSorting: [
          {
            field: 'timestamp',
            order: 'asc',
          },
        ],
        grid: {
          columns: [
            {
              name: 'customer_id',
            },
            {
              name: 'message',
            },
            {
              name: 'timestamp',
            },
            {
              name: 'customer_id',
              expandedKey: 'avatar',
            },
            {
              name: 'customer_id',
              expandedKey: 'email',
            },
            {
              name: 'customer_id',
              expandedKey: 'fullName',
            },
            {
              name: 'agent_id',
            },
            {
              name: 'agent_id',
              expandedKey: 'avatar',
            },
            {
              name: 'agent_id',
              expandedKey: 'email',
            },
            {
              name: 'agent_id',
              expandedKey: 'fullName',
            },
          ],
        },
      }),
    },
  ],
});
