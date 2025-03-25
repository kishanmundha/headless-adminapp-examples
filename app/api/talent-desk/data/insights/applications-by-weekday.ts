import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { EntityName } from '@/app/talent-desk/config/enums';
import { Op, Sequelize } from 'sequelize';

interface Payload {
  from: string;
  to: string;
  job_ids: string[];
}

export const customActionApplicationsByWeekday: CustomActionFn<
  Payload
> = async ({ job_ids }) => {
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
      [Sequelize.literal(`EXTRACT(ISODOW FROM applied_at) - 1`), 'weekday'],
    ],
    where: whereClause,
    group: ['weekday'],
    order: [['weekday', 'ASC']],
  });

  return result.map((data) => ({
    weekday: data.dataValues.weekday,
    count: data.dataValues.count,
  }));
};
