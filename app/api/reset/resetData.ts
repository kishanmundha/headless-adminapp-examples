import { sequelize } from '../sequelize';
import { currentUser } from '@/app/mockuser';
import { resetMockData as resetHelpDeskMockData } from '../help-desk/data/mockdata/generator';
import { resetMockData as resetServiceBookingMockData } from '@/app/service-booking/config/server/mockdata/generator';
import { resetMockData as resetTalentDeskMockData } from '@/app/talent-desk/config/server/mockdata/generator';
import { resetMockData as resetSalesHubMockData } from '@/app/sales-hub/config/server/mockdata/generator';

export async function resetData() {
  await sequelize.query('drop view if exists sh_timelines');
  await sequelize.query('drop view if exists sh_activities');

  await sequelize.sync({ force: true });
  console.log('Creating help desk data...');
  await resetHelpDeskMockData();
  console.log('Creating service booking data...');
  await resetServiceBookingMockData(currentUser);
  console.log('Creating talent desk data...');
  await resetTalentDeskMockData(currentUser);
  console.log('Creating sales hub data...');
  await resetSalesHubMockData(currentUser);

  console.log('Createing views...');

  await sequelize.query(
    `create view sh_timelines as
      select
        id,
        'notes' as timelinetype,
        subject,
        createdon,
        updatedon,
        regardingobjectid,
        regardingobjecttype,
        notetext,
        null AS scheduledstart,
        null AS scheduledend,
        null AS status
      FROM sh_notes
    union all
    SELECT
      id,
      'tasks' AS timelinetype,
      subject,
      createdon,
      updatedon,
      regardingobjectid,
      regardingobjecttype,
      '' AS notetext,
      scheduledstart,
      scheduledend,
      status
    FROM sh_tasks
    union all
    SELECT
      id,
      'appointments' AS timelinetype,
      title AS subject,
      created_on AS createdon,
      updated_on AS updatedon,
      regardingobjectid,
      regardingobjecttype,
      description AS notetext,
      start AS scheduledstart,
      "end" AS scheduledend,
      status
    FROM sh_appointments;
    `
  );

  await sequelize.query(
    `create view sh_activities as
    SELECT
      id,
      'tasks' AS activitytype,
      subject,
      createdon,
      updatedon,
      regardingobjectid,
      regardingobjecttype,
      scheduledstart,
      scheduledend,
      status
    FROM sh_tasks
    union all
    SELECT
      id,
      'appointments' AS activitytype,
      title AS subject,
      created_on AS createdon,
      updated_on AS updatedon,
      regardingobjectid,
      regardingobjecttype,
      start AS scheduledstart,
      "end" AS scheduledend,
      status
    FROM sh_appointments;
    `
  );

  console.log('Reset data completed.');
}
