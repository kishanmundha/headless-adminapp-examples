import { SchemaStore } from '@headless-adminapp/core/store';
import { systemUserSchema } from '../schema/systemuser';
import { contactSchema } from '../schema/contact';
import { companySchema } from '../schema/company';
import { dealSchema } from '../schema/deal';
import { timelineSchema } from '../schema/timeline';
import { noteSchema } from '../schema/note';
import { taskSchema } from '../schema/task';
import { appointmentSchema } from '../schema/appointment';
import { activitySchema } from '../schema/activity';

export const clientSchemaStore = new SchemaStore();

clientSchemaStore.register(systemUserSchema);
clientSchemaStore.register(contactSchema);
clientSchemaStore.register(companySchema);
clientSchemaStore.register(dealSchema);

clientSchemaStore.register(timelineSchema);
clientSchemaStore.register(noteSchema);
clientSchemaStore.register(taskSchema);
clientSchemaStore.register(appointmentSchema);
clientSchemaStore.register(activitySchema);

clientSchemaStore.validate();
