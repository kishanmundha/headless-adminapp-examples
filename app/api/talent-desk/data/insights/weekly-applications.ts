import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { EntityName } from '@/app/talent-desk/config/enums';
import { Op, Sequelize } from 'sequelize';

interface Payload {
  from: string;
  to: string;
  job_ids: string[];
}

export const customActionWeeklyApplications: CustomActionFn<Payload> = async ({
  job_ids,
}) => {
  const Applicant = schemaStore.getModel(EntityName.Application);

  const whereClause: Record<string, unknown> = {};

  if (job_ids?.length) {
    whereClause.job_id = {
      [Op.in]: job_ids,
    };
  }

  const result = await Applicant.findAll({
    attributes: [
      [
        Sequelize.cast(Sequelize.fn('COUNT', Sequelize.literal(`1`)), 'INT'),
        'count',
      ],
      [
        Sequelize.cast(
          Sequelize.literal(
            `sum(case when status != 'rejected' then 1 else 0 end)`
          ),
          'INT'
        ),
        'shortlisted',
      ],
      [
        Sequelize.literal(
          `(date_trunc('week', applied_at) + INTERVAL '0 day')::date`
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
    count: data.dataValues.count,
    shortlisted: data.dataValues.shortlisted,
  }));
};
