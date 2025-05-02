import { SequelizeSchemaStore } from '@headless-adminapp/server-sdk-sequelize';

import { systemUserSchema } from '../schema/systemuser';
import { contactSchema } from '../schema/contact';
import { sequelize } from '@/app/api/sequelize';
import { companySchema } from '../schema/company';
import { dealSchema } from '../schema/deal';
import { timelineSchema } from '../schema/timeline';
import { noteSchema } from '../schema/note';
import { taskSchema } from '../schema/task';
import { appointmentSchema } from '../schema/appointment';
import { activitySchema } from '../schema/activity';

export const schemaStore = new SequelizeSchemaStore({
  sequelize,
});

schemaStore.register(systemUserSchema);
schemaStore.register(contactSchema);
schemaStore.register(companySchema);
schemaStore.register(dealSchema);

schemaStore.register(timelineSchema);
schemaStore.register(noteSchema);
schemaStore.register(taskSchema);
schemaStore.register(appointmentSchema);
schemaStore.register(activitySchema);

schemaStore.validate();
schemaStore.ensureRelations();
