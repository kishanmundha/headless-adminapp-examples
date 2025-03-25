import { SchemaStore } from '@headless-adminapp/core/store';
import { jobSchema } from '../schema/job';
import { applicationSchema } from '../schema/application';
import { candidateSchema } from '../schema/candidate';
import { interviewSchema } from '../schema/interview';
import { userSchema } from '../schema/user';
import { offerSchema } from '../schema/offer';

export const clientSchemaStore = new SchemaStore();

clientSchemaStore.register(jobSchema);
clientSchemaStore.register(applicationSchema);
clientSchemaStore.register(candidateSchema);
clientSchemaStore.register(interviewSchema);
clientSchemaStore.register(userSchema);
clientSchemaStore.register(offerSchema);

clientSchemaStore.validate();
