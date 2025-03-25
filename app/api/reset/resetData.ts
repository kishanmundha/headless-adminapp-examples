import { sequelize } from '../sequelize';
import { currentUser } from '@/app/mockuser';
import { resetMockData as resetHelpDeskMockData } from '../help-desk/data/mockdata/generator';
import { resetMockData as resetServiceBookingMockData } from '@/app/service-booking/config/server/mockdata/generator';
import { resetMockData as resetTalentDeskMockData } from '@/app/talent-desk/config/server/mockdata/generator';

export async function resetData() {
  await sequelize.sync({ force: true });
  await resetHelpDeskMockData();
  await resetServiceBookingMockData(currentUser);
  await resetTalentDeskMockData(currentUser);
}
