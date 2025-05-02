import { schemaStore } from '@/app/sales-hub/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { Op, Sequelize } from 'sequelize';

interface Payload {
  category: string[] | undefined;
}

export const customActionDealPipeline: CustomActionFn<Payload> = async ({
  category,
}) => {
  const Deal = schemaStore.getModel('deals');

  const whereClause: Record<string, unknown> = {};

  if (category?.length) {
    whereClause.category = {
      [Op.in]: category,
    };
  }

  const result = await Deal.findAll({
    attributes: [
      [
        Sequelize.cast(Sequelize.fn('SUM', Sequelize.literal(`1`)), 'INT'),
        'deals',
      ],
      [
        Sequelize.cast(
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `case when stage in ('opportunity', 'proposal', 'negotiation', 'won') then 1 else 0 end`
            )
          ),
          'INT'
        ),
        'negotiation',
      ],
      [
        Sequelize.cast(
          Sequelize.fn(
            'SUM',
            Sequelize.literal(`case when stage in ('won') then 1 else 0 end`)
          ),
          'INT'
        ),
        'won',
      ],
    ],
    where: whereClause,
  });

  const dataValues = result[0].dataValues;

  return [
    {
      stage: 'Deals',
      count: dataValues.deals,
    },
    {
      stage: 'Negotiation',
      count: dataValues.negotiation,
    },
    {
      stage: 'Won',
      count: dataValues.won,
    },
  ];
};
