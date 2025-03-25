import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { EntityName } from '@/app/talent-desk/config/enums';

interface Payload {
  job_ids: string[];
}

export const customActionApplicationsByHour: CustomActionFn<Payload> = async ({
  job_ids,
}) => {
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
	count(1) as count,
	FLOOR(EXTRACT(HOUR FROM applied_at) / 4) * 4 as hour,
	EXTRACT(ISODOW FROM applied_at) - 1 as weekday
from td_applications
${whereClause}
group by hour, weekday
order by weekday, hour
`);

  const values = result?.[0] as Array<{
    count: string;
    hour: string;
    weekday: string;
  }>;

  return values.map((value) => ({
    hours: Number(value.hour),
    week_day: Number(value.weekday),
    count: Number(value.count),
  }));
};
