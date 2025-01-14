import { SchemaStore } from '@headless-adminapp/core/store';
import { ticketSchema } from './schema/ticket';
import { customerSchema } from './schema/customer';
import { productSchema } from './schema/product';
import { messageSchema } from './schema/message';
import { agentSchema } from './schema/agent';

export const clientSchemaStore = new SchemaStore();

clientSchemaStore.register(ticketSchema);
clientSchemaStore.register(customerSchema);
clientSchemaStore.register(productSchema);
clientSchemaStore.register(messageSchema);
clientSchemaStore.register(agentSchema);
