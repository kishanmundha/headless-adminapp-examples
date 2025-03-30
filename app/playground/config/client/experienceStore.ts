import { SchemaExperienceStore } from '@headless-adminapp/app/store';

import { clientSchemaStore } from './schemaStore';
import { userSchemaExperience } from './experience/user';

export const clientExperienceStore = new SchemaExperienceStore({
  schemaStore: clientSchemaStore,
});

clientExperienceStore.register(userSchemaExperience);
