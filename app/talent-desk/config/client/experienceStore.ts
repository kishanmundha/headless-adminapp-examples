import { SchemaExperienceStore } from '@headless-adminapp/app/store';

import { clientSchemaStore } from './schemaStore';
import { jobSchemaExperience } from './experience/job';
import { applicationSchemaExperience } from './experience/application';
import { candidateSchemaExperience } from './experience/candidate';
import { interviewSchemaExperience } from './experience/interview';
import { userSchemaExperience } from '@/app/service-booking/config/client/experience/user';
import { offerSchemaExperience } from './experience/offer';

export const clientExperienceStore = new SchemaExperienceStore({
  schemaStore: clientSchemaStore,
});

clientExperienceStore.register(jobSchemaExperience);
clientExperienceStore.register(applicationSchemaExperience);
clientExperienceStore.register(candidateSchemaExperience);
clientExperienceStore.register(interviewSchemaExperience);
clientExperienceStore.register(userSchemaExperience);
clientExperienceStore.register(offerSchemaExperience);
