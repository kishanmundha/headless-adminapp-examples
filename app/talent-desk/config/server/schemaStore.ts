import { SequelizeSchemaStore } from '@headless-adminapp/server-sdk-sequelize';
import { sequelize } from '../../../api/sequelize';

import { jobSchema } from '../schema/job';
import { applicationSchema } from '../schema/application';
import { candidateSchema } from '../schema/candidate';
import { interviewSchema } from '../schema/interview';
import { userSchema } from '../schema/user';
import { offerSchema } from '../schema/offer';

export const schemaStore = new SequelizeSchemaStore({
  sequelize,
});

schemaStore.register(jobSchema);
schemaStore.register(applicationSchema);
schemaStore.register(candidateSchema);
schemaStore.register(interviewSchema);
schemaStore.register(userSchema);
schemaStore.register(offerSchema);

schemaStore.validate();
schemaStore.ensureRelations();
