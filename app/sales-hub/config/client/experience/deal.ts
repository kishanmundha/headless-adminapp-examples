import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { dealSchema } from '../../schema/deal';
import { TimelineControl } from '../components/TimelineControl';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';

const builder = new SchemaExperienceBuilder(dealSchema);

const Icon = bundleLazyIcon('Rocket24Regular', 'Rocket24Filled');

export const dealSchemaExperience = builder.defineExperience({
  Icon,
  views: [
    {
      id: 'default',
      name: 'All Deals',
      experience: builder.defineViewExperience({
        grid: [
          'title',
          'companyid',
          'contactid',
          'salesownerid',
          'category',
          'amount',
          'expectedCloseDate',
          'stage',
        ],
        card: {
          primaryColumn: 'title',
          secondaryColumns: [{ name: 'companyid' }, { name: 'amount' }],
          rightColumn: [
            {
              name: 'stage',
              variant: 'choice',
            },
          ],
        },
      }),
    },
  ],
  associatedViews: [
    {
      id: 'default',
      name: 'Deals',
      experience: builder.defineViewExperience({
        grid: [
          'title',
          'contactid',
          'salesownerid',
          'category',
          'amount',
          'expectedCloseDate',
          'stage',
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
            // columnWidths: ['1fr', '400px'],
            tabColumns: [
              {
                sections: [
                  {
                    name: 'general-info',
                    label: 'General Information',
                    controls: [
                      'title',
                      'amount',
                      'companyid',
                      'contactid',
                      'category',
                      'salesownerid',
                      'description',
                    ],
                  },
                  {
                    name: 'status-info',
                    label: 'Status Information',
                    controls: ['expectedCloseDate', 'stage'],
                  },
                ],
              },
              {
                sections: [
                  {
                    label: 'Timeline',
                    name: 'timeline',
                    noPadding: true,
                    hideLabel: true,
                    controls: [
                      {
                        type: 'component',
                        component: TimelineControl,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        processFlow: {
          getSteps: (context) => {
            if (!context.primaryControl.recordId) {
              return null;
            }

            const activatedFlagMapping: Record<string, string[]> = {
              opportunity: ['opportunity'],
              proposal: ['opportunity', 'proposal'],
              negotiation: ['opportunity', 'proposal', 'negotiation'],
              won: ['opportunity', 'proposal', 'negotiation', 'won'],
              lost: ['opportunity', 'proposal', 'negotiation', 'lost'],
            };

            const status = context.primaryControl.originalData?.stage as string;

            if (!status) {
              return null;
            }

            if (!activatedFlagMapping[status]) {
              return null;
            }

            if (status === 'lost') {
              return [
                {
                  label: 'Opportunity',
                  isActivated: true,
                },
                {
                  label: 'Proposal',
                  isActivated: true,
                },
                {
                  label: 'Negotiation',
                  isActivated: true,
                },
                {
                  label: 'Lost',
                  isActivated: true,
                },
              ];
            }

            return [
              {
                label: 'Opportunity',
                isActivated:
                  activatedFlagMapping[status]?.includes('opportunity'),
              },
              {
                label: 'Proposal',
                isActivated: activatedFlagMapping[status]?.includes('proposal'),
              },
              {
                label: 'Negotiation',
                isActivated:
                  activatedFlagMapping[status]?.includes('negotiation'),
              },
              {
                label: 'Won',
                isActivated: activatedFlagMapping[status]?.includes('won'),
              },
              {
                label: 'Lost',
                isActivated: activatedFlagMapping[status]?.includes('lost'),
              },
            ];
          },
        },
      }),
    },
  ],
});
