import { SchemaExperienceStore } from '@headless-adminapp/app/store';

import { clientSchemaStore } from './schemaStore';
import { systemUserSchemaExperience } from './experience/systemuser';
import { contactSchemaExperience } from './experience/contact';
import { companySchemaExperience } from './experience/company';
import { dealSchemaExperience } from './experience/deal';
import { taskSchemaExperience } from './experience/task';
import { appointmentSchemaExperience } from './experience/appointment';
import { activitySchemaExperience } from './experience/activity';
import { timelineSchemaExperience } from './experience/timeline';

export const clientExperienceStore = new SchemaExperienceStore({
  schemaStore: clientSchemaStore,
});

clientExperienceStore.register(systemUserSchemaExperience);
clientExperienceStore.register(contactSchemaExperience);
clientExperienceStore.register(companySchemaExperience);
clientExperienceStore.register(dealSchemaExperience);

clientExperienceStore.register(taskSchemaExperience);
clientExperienceStore.register(appointmentSchemaExperience);
clientExperienceStore.register(activitySchemaExperience);
clientExperienceStore.register(timelineSchemaExperience);
