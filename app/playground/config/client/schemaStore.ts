import { SchemaStore } from '@headless-adminapp/core/store';
import { userSchema } from '../schema/user';

export const clientSchemaStore = new SchemaStore();

clientSchemaStore.register(userSchema);

clientSchemaStore.validate();
