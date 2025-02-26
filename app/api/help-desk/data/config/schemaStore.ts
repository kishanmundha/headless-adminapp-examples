import { SequelizeSchemaStore } from '@headless-adminapp/server-sdk-sequelize';
import { sequelize } from '../../../sequelize';

import { ticketSchema } from '@/app//help-desk/config/schema/ticket';
import { customerSchema } from '@/app//help-desk/config/schema/customer';
import { productSchema } from '@/app//help-desk/config/schema/product';
import { messageSchema } from '@/app//help-desk/config/schema/message';
import { agentSchema } from '@/app/help-desk/config/schema/agent';

export const schemaStore = new SequelizeSchemaStore({
  sequelize,
});

schemaStore.register(customerSchema);
schemaStore.register(productSchema);
schemaStore.register(ticketSchema);
schemaStore.register(messageSchema);
schemaStore.register(agentSchema);

schemaStore.ensureRelations();
