import { SchemaExperienceStore } from '@headless-adminapp/app/store';

import { clientSchemaStore } from './schemaStore';
import { userSchemaExperience } from './experience/user';
import { customerSchemaExperience } from './experience/customer';
import { serviceSchemaExperience } from './experience/service';
import { appointmentSchemaExperience } from './experience/appointment';

export const clientExperienceStore = new SchemaExperienceStore({
  schemaStore: clientSchemaStore,
});

clientExperienceStore.register(userSchemaExperience);
clientExperienceStore.register(customerSchemaExperience);
clientExperienceStore.register(serviceSchemaExperience);
clientExperienceStore.register(appointmentSchemaExperience);
