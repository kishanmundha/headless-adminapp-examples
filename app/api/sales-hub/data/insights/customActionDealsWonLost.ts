import { schemaStore } from '@/app/sales-hub/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { Op, Sequelize } from 'sequelize';

interface Payload {
  category: string[] | undefined;
}

export const customActionDealsWonLost: CustomActionFn<Payload> = async ({
  category,
}) => {
  const Applicant = schemaStore.getModel('deals');

  const whereClause: Record<string, unknown> = {};

  if (category?.length) {
    whereClause.category = {
      [Op.in]: category,
    };
  }

  const result = await Applicant.findAll({
    attributes: [
      [
        Sequelize.cast(
          Sequelize.literal(
            `sum(case when stage != 'won' then amount else 0 end)`
          ),
          'INT'
        ),
        'won',
      ],
      [
        Sequelize.cast(
          Sequelize.literal(
            `sum(case when stage != 'lost' then amount else 0 end)`
          ),
          'INT'
        ),
        'lost',
      ],
      [
        Sequelize.cast(
          Sequelize.literal(
            `sum(case when stage in ('opportunity', 'proposal', 'negotiation') then amount else 0 end)`
          ),
          'INT'
        ),
        'pending',
      ],
      [
        Sequelize.literal(
          `(date_trunc('month', "createdAt") + INTERVAL '0 day')::date`
        ),
        'date',
      ],
    ],
    group: ['date'],
    order: [['date', 'ASC']],
    where: whereClause,
  });

  return result.map((data) => ({
    date: new Date(data.dataValues.date).getTime(),
    won: data.dataValues.won,
    lost: -data.dataValues.lost,
    pending: data.dataValues.pending,
  }));
};
