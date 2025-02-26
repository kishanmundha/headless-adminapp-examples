import { SchemaStore } from '@headless-adminapp/core/store';
import { userSchema } from '../schema/user';
import { customerSchema } from '../schema/customer';
import { serviceSchema } from '../schema/service';
import { appointmentSchema } from '../schema/appointment';

export const clientSchemaStore = new SchemaStore();

clientSchemaStore.register(userSchema);
clientSchemaStore.register(serviceSchema);
clientSchemaStore.register(customerSchema);
clientSchemaStore.register(appointmentSchema);

clientSchemaStore.validate();
