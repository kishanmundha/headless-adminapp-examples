import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { activitySchema } from '../../schema/activity';
import dayjs from 'dayjs';
import { defineQuickFilter } from '@/packages/core/experience/view/QuickFilter';
import { Condition, Filter } from '@/packages/core/transport';

const builder = new SchemaExperienceBuilder(activitySchema);

const defaultViewExperience = builder.defineViewExperience({
  grid: [
    'subject',
    { name: 'activitytype', maxWidth: 150 },
    'regardingobjectid',
    { name: 'scheduledstart', label: 'Due Date' },
    { name: 'status', maxWidth: 150 },
  ],
  card: {
    primaryColumn: 'subject',
    secondaryColumns: [{ name: 'activitytype' }, { name: 'scheduledstart' }],
    rightColumn: [
      {
        name: 'status',
        variant: 'choice',
      },
    ],
  },
});

export const activitySchemaExperience = builder.defineExperience({
  defaultViewId: 'active-activities',
  views: [
    {
      id: 'active-activities',
      name: 'Active Activities',
      experience: builder.defineViewExperience({
        ...defaultViewExperience,
        defaultSorting: [
          {
            field: 'scheduledstart',
            order: 'asc',
          },
        ],
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'status',
              operator: 'in',
              value: ['todo', 'scheduled'],
            },
          ],
        },
        quickFilter: defineQuickFilter({
          attributes: {
            due: {
              type: 'choice',
              label: 'Due',
              string: true,
              options: [
                {
                  value: 'overdue',
                  label: 'Overdue',
                },
                {
                  value: 'today',
                  label: 'Today or earlier',
                },
                {
                  value: 'tomorrow',
                  label: 'Tomorrow or earlier',
                },
                {
                  value: 'next-7-days',
                  label: 'Next 7 Days or earlier',
                },
                {
                  value: 'all',
                  label: 'All',
                },
              ],
            },
            type: {
              type: 'choices',
              label: 'Activity Type',
              string: true,
              options: [
                {
                  value: 'tasks',
                  label: 'Task',
                },
                {
                  value: 'appointments',
                  label: 'Appointment',
                },
              ],
            },
          },
          defaultValues: {
            due: 'overdue',
            type: null,
          },
          resolver: (values) => {
            const conditions: Condition[] = [];

            const due = values.due as string | null;
            const type = values.type as string[] | null;

            switch (due) {
              case 'overdue':
                conditions.push({
                  field: 'scheduledstart',
                  operator: 'on-or-before',
                  value: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
                });
              case 'today':
                conditions.push({
                  field: 'scheduledstart',
                  operator: 'on-or-before',
                  value: dayjs().format('YYYY-MM-DD'),
                });
              case 'tomorrow':
                conditions.push({
                  field: 'scheduledstart',
                  operator: 'on-or-before',
                  value: dayjs().add(1, 'day').format('YYYY-MM-DD'),
                });
              case 'next-7-days':
                conditions.push({
                  field: 'scheduledstart',
                  operator: 'on-or-before',
                  value: dayjs().add(7, 'day').format('YYYY-MM-DD'),
                });
            }

            if (type?.length) {
              conditions.push({
                field: 'activitytype',
                operator: 'in',
                value: type,
              });
            }

            if (conditions.length === 0) {
              return null;
            }

            return {
              type: 'and',
              conditions,
            } as Filter;
          },
        }),
      }),
    },
    {
      id: 'all-activities',
      name: 'All Activities',
      experience: builder.defineViewExperience({
        ...defaultViewExperience,
        defaultSorting: [
          {
            field: 'scheduledstart',
            order: 'asc',
          },
        ],
      }),
    },
  ],
  forms: [
    {
      id: 'default',
      name: 'Default',
      experience: builder.defineFormExperience([
        'regardingobjectid',
        'subject',
        'scheduledstart',
        'scheduledend',
        'status',
      ]),
    },
  ],
});
