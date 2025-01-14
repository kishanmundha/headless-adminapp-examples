import { SchemaExperienceStore } from '@headless-adminapp/app/store';

import { clientSchemaStore } from './clientSchemaStore';
import { ticketSchemaExperience } from './experience/ticket';
import { customerSchemaExperience } from './experience/customer';
import { productSchemaExperience } from './experience/product';
import { messageSchemaExperience } from './experience/message';
import { agentSchemaExperience } from './experience/agent';

export const clientExperienceStore = new SchemaExperienceStore({
  schemaStore: clientSchemaStore,
});

clientExperienceStore.register(ticketSchemaExperience);
clientExperienceStore.register(customerSchemaExperience);
clientExperienceStore.register(productSchemaExperience);
clientExperienceStore.register(messageSchemaExperience);
clientExperienceStore.register(agentSchemaExperience);
