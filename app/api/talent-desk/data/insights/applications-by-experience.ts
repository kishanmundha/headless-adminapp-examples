import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { EntityName } from '@/app/talent-desk/config/enums';

interface Payload {
  job_ids: string[];
}

export const customActionApplicationsByExperience: CustomActionFn<
  Payload
> = async ({ job_ids }) => {
  const Applicant = schemaStore.getModel(EntityName.Application);

  const whereConditions: string[] = [];

  if (job_ids?.length) {
    whereConditions.push(`job_id IN ('${job_ids.join("','")}')`);
  }

  const whereClause = whereConditions.length
    ? 'where ' + whereConditions.join(' and ')
    : '';

  const result = await Applicant.sequelize?.query(`
    select
	SUM(case when td_candidates.experience < 12 then 1 else 0 end) as lessthan1year,
	SUM(case when td_candidates.experience >= 12 and td_candidates.experience < 24 then 1 else 0 end) as onetwoyear,
	SUM(case when td_candidates.experience >= 24 and td_candidates.experience < 60 then 1 else 0 end) as twofiveyear,
	SUM(case when td_candidates.experience >= 60 and td_candidates.experience < 120 then 1 else 0 end) as fivetenyear,
	SUM(case when td_candidates.experience >= 120 then 1 else 0 end) as morethan10year
from td_applications
inner join td_candidates on td_candidates.id = td_applications.candidate_id
${whereClause}
`);

  const values = result?.[0][0] as {
    lessthan1year: string;
    onetwoyear: string;
    twofiveyear: string;
    fivetenyear: string;
    morethan10year: string;
  };

  return [
    {
      exp: '< 1 Year',
      count: Number(values.lessthan1year),
    },
    {
      exp: '1-2 Years',
      count: Number(values.onetwoyear),
    },
    {
      exp: '2-5 Years',
      count: Number(values.twofiveyear),
    },
    {
      exp: '5-10 Years',
      count: Number(values.fivetenyear),
    },
    {
      exp: '> 10 Years',
      count: Number(values.morethan10year),
    },
  ];
};
