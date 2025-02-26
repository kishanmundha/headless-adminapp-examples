import { SequelizeSchemaStore } from '@headless-adminapp/server-sdk-sequelize';
import { sequelize } from '../../../api/sequelize';

import { appointmentSchema } from '@/app/service-booking/config/schema/appointment';
import { customerSchema } from '../schema/customer';
import { serviceSchema } from '../schema/service';
import { userSchema } from '../schema/user';

export const schemaStore = new SequelizeSchemaStore({
  sequelize,
});

schemaStore.register(appointmentSchema);
schemaStore.register(customerSchema);
schemaStore.register(serviceSchema);
schemaStore.register(userSchema);

schemaStore.validate();
schemaStore.ensureRelations();
