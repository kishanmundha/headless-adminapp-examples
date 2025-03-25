import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { EntityName } from '@/app/talent-desk/config/enums';
import { Op, Sequelize } from 'sequelize';

interface Payload {
  job_ids: string[];
}

export const customActionApplicationPipeline: CustomActionFn<Payload> = async ({
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
        Sequelize.cast(Sequelize.fn('SUM', Sequelize.literal(`1`)), 'INT'),
        'applicants',
      ],
      [
        Sequelize.cast(
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `case when status in ('interview-scheduled', 'interview-completed', 'interview-rejected', 'offered', 'offer-accepted', 'offer-rejected', 'hired') then 1 else 0 end`
            )
          ),
          'INT'
        ),
        'interviews',
      ],
      [
        Sequelize.cast(
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              `case when status in ('offered', 'offer-accepted', 'offer-rejected', 'hired') then 1 else 0 end`
            )
          ),
          'INT'
        ),
        'offered',
      ],
      [
        Sequelize.cast(
          Sequelize.fn(
            'SUM',
            Sequelize.literal(`case when status in ('hired') then 1 else 0 end`)
          ),
          'INT'
        ),
        'hired',
      ],
    ],
    where: whereClause,
  });

  const dataValues = result[0].dataValues;

  return [
    {
      stage: 'Applicants',
      count: dataValues.applicants,
    },
    {
      stage: 'Interviews',
      count: dataValues.interviews,
    },
    {
      stage: 'Offers',
      count: dataValues.offered,
    },
    {
      stage: 'Hires',
      count: dataValues.hired,
    },
  ];
};
