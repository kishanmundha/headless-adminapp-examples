import { faker } from '@faker-js/faker';
import { schemaStore } from '../config/schemaStore';
import { Ticket } from '@/app/help-desk/config/schema/ticket';
import { Message } from '@/app/help-desk/config/schema/message';
import { Customer } from '@/app/help-desk/config/schema/customer';
import { Product } from '@/app/help-desk/config/schema/product';
import { Agent } from '@/app/help-desk/config/schema/agent';
import { EntityName } from '@/app/help-desk/config/enums';

type DbTicket = Omit<Ticket, 'customer_id' | 'product_id' | 'agent_id'> & {
  customer_id: string;
  product_id: string;
  agent_id?: string;
};
type DbMessage = Omit<Message, 'ticket_id' | 'customer_id' | 'agent_id'> & {
  ticket_id: string;
  customer_id: string | null;
  agent_id: string | null;
};

type DbCustomer = Omit<Customer, 'avatar' | 'product_id'> & {
  avatar: string;
  product_id?: string | null;
};

type DbProduct = Product;
type DbAgent = Omit<Agent, 'avatar'> & { avatar: string };

const agents: DbAgent[] = new Array(2).fill(null).map(() => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    fullName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: faker.internet.email({
      firstName,
      lastName,
      provider: 'support.com',
    }),
    avatar: faker.image.urlPicsumPhotos({
      width: 50,
      height: 50,
    }),
  };
});

const products: DbProduct[] = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid(),
  model: faker.commerce.productName(),
  tickets: 0,
  customers: 0,
}));

const customers: DbCustomer[] = new Array(30).fill(null).map(() => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const product = faker.helpers.arrayElement(products);

  product.customers++;

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    role: 'user',
    avatar: faker.image.urlLoremFlickr({
      width: 50,
      height: 50,
    }),
    phone: faker.phone.number({ style: 'international' }),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    state: faker.location.state(),
    product_id: product.id,
    tickets: 0,
    openTickets: 0,
  };
});

const ticketsJson = [
  {
    subject: 'My fridge stopped cooling down',
    status: 'open',
    category: 'cooling',
    messages: [
      {
        author: 'customer',
        message:
          'Hi Acme Refrigerator,\n\nMy fridge is not working.\nThe temperature is too high and my food is spoiling.\nMy wife already called you about that fridge a few days ago.\n\nPlease help me.\n\nThanks,\nJohn',
      },
      {
        author: 'agent',
        message:
          "Hi John, I'm sorry to hear that.\n\nCan you please give me the reference and model number of your fridge?\n\nThanks,\nAlbert",
      },
      {
        author: 'customer',
        message:
          "Sure, it's the SuperCooler 2002, and the model is 254851X.\n\nJohn",
      },
      {
        author: 'agent',
        message:
          'Thanks for that information, John.\n\nCan you try unplugging your fridge for 5 minutes and then plugging it back in?\n\nThanks,\nAlbert',
      },
      {
        author: 'customer',
        message: "I already tried that, but it didn't work.\n\nJohn",
      },
      {
        author: 'agent',
        message:
          "Okay, let's try something else.\n\nCan you use the touch screen to access the Settings menu, then go to the Advanced Settings, and click on the AutoDiagnosis button?\nWhat does it show on the screen?\n\nThanks,\nAlbert",
      },
      {
        author: 'customer',
        message:
          "It says some tech gibberish, and ends with 'Error 0x00000078'",
      },
      {
        author: 'agent',
        message:
          "Hello John,\n\nI see. This error code indicates a problem with the motherboard.\n\nI will order a new motherboard to be delivered to your house, then send a technician to install \nI'll send you an email with the tracking number of the motherboard.\n\nThanks,\nAlbert",
      },
    ],
  },
  {
    subject: 'Strange sound coming from SuperCooler',
    status: 'open',
    category: 'noise',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, I've noticed that my fridge is making a strange noise. It sounds like a buzzing or humming noise, and it's happening all the time.",
      },
      {
        author: 'agent',
        message:
          'Hello John, thanks for reaching out to us. Can you please tell me the model and reference of your fridge?',
      },
      {
        author: 'customer',
        message: "It's a SuperCooler 3008, and the model number is 254551X.",
      },
      {
        author: 'agent',
        message:
          "Thanks for that information. The buzzing or humming noise you're hearing is most likely caused by the compressor, which is responsible for cooling the fridge. Can you try unplugging your fridge for 5 minutes, and then plug it back in to see if the noise stops?",
      },
      {
        author: 'customer',
        message: 'I tried that already, but the noise is still there.',
      },
      {
        author: 'agent',
        message:
          "In that case, it's possible that the compressor is faulty and needs to be replaced. I will send a technician to your location to diagnose and fix the problem. Thank you for your patience.",
      },
    ],
  },
  {
    subject: 'Fridge not working, food spoiled. Help!!',
    status: 'resolved',
    category: 'cooling',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, my fridge is not working. It's making a loud noise and the food is warm.",
      },
      {
        author: 'agent',
        message:
          'Hello John, thanks for reaching out to us. Can you please tell me the model and reference of your fridge?',
      },
      {
        author: 'customer',
        message: "It's a SuperCooler 2002, model number 254851X.",
      },
      {
        author: 'agent',
        message:
          'Thanks for that information. It sounds like there may be a problem with the compressor. Let me check for an available technician to come and fix the problem.',
      },
      {
        author: 'customer',
        message:
          "The technician came to my house and fixed the fridge. It's working fine now. You can close the ticket.",
      },
      {
        author: 'agent',
        message:
          "Thanks for letting us know. I'm glad to hear that the problem is fixed. Have a nice day!",
      },
    ],
  },
  {
    subject: 'Light inside my fridge always on??',
    status: 'open',
    category: 'light',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, how can I be sure that the light in my fridge turns off when the door is closed? I'm worried about the energy consumption.",
      },
      {
        author: 'agent',
        message:
          "Hello Alice, thanks for reaching out to us. The light in your fridge will turn off automatically when the door is closed, thanks to a sensor that detects the door's position. Unfortunately, we cannot guarantee that the light will turn off if the door is not closed properly. Is there anything else I can help you with?",
      },
      {
        author: 'customer',
        message:
          "I'm sorry, but I really need to know if the light turns off when the door is closed. Can you please escalate this issue to a senior agent?",
      },
    ],
  },
  {
    subject: 'No power',
    status: 'resolved',
    category: 'power',
    messages: [
      {
        author: 'customer',
        message:
          'Hi, my fridge just went off. The ice cream in the freezer is melting and the food in the fridge is starting to smell bad. Can you please send a technician to fix it?',
      },
      {
        author: 'customer',
        message: 'Hello, are you there?',
      },
      {
        author: 'customer',
        message:
          "Nevermind, my dog has chewed the power cord. I'll buy a new one. Sorry for bothering you.",
      },
      {
        author: 'agent',
        message:
          "Thanks for letting us know, Bob. I'm glad to hear that the problem is fixed. Have a nice day!",
      },
    ],
  },
  {
    subject: 'Warranty validity',
    status: 'in_progress',
    category: 'warranty',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, it's Bob again. I have a question about the warranty. I bought the fridge 2 years ago, and I'm wondering if it's still covered by the warranty.",
      },
      {
        author: 'agent',
        message:
          'Hello Bob, thanks for reaching out to us. Our fridges are covered by a 2-year warranty. When exactly did you buy the fridge?',
      },
      {
        author: 'customer',
        message:
          "I bought it on December 1st, 2020. So... it's still covered by the warranty, right?",
      },
      {
        author: 'agent',
        message:
          "I'm sorry, but it seems that the warranty has expired. If you have a problem, we can still send you a technician, but you will have to pay for the service.",
      },
      {
        author: 'customer',
        message:
          "Oh, that's too bad. Let me think about it and I'll get back to you.",
      },
    ],
  },
  {
    subject: 'Connected fridge setup',
    status: 'in_progress',
    category: 'setup',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, I'm Sarah. I just bought a new fridge from you guys. I'm wondering if you can help me set it up.",
      },
      {
        author: 'agent',
        message:
          'Sure thing, Sarah. Can you tell me the exact model of your fridge?',
      },
    ],
  },
  {
    subject: 'Need invoice',
    status: 'resolved',
    category: 'billing',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, I'm Denise. I just bought a new SuperCooler fridge from the online website, and I need an invoice. How can I get one?",
      },
      {
        author: 'agent',
        message:
          "Hi Denise,\n\nThanks for reaching out to us. I've found your online order using your email address. I will send you the invoice by email.\n\nPlease let me know if you have any other questions.\n\nBest,\n\nJohn",
      },
      {
        author: 'customer',
        message: 'Wow, that was fast. Thanks!',
      },
      {
        author: 'agent',
        message: "You're welcome!",
      },
    ],
  },
  {
    subject: "Don't forget the milk",
    status: 'resolved',
    category: 'other',
    messages: [
      {
        author: 'customer',
        message:
          'Hi sweetie, I think you forgot the milk again. Can you please buy some on your way home?',
      },
      {
        author: 'customer',
        message:
          'Oops, wrong address... I meant to send this to my wife. Sorry!',
      },
      {
        author: 'agent',
        message:
          'Hi Mitch,\n\nNo worries, I sometimes write to my dog, too!\n\nBest,\n\nJohn',
      },
    ],
  },
  {
    subject: 'I broke the thermostat',
    status: 'resolved',
    category: 'parts',
    messages: [
      {
        author: 'customer',
        message:
          "Hi, I'm Bob.\nıI just broke the thermostat in my SuperCooler 3008. Where can I find a new one? Do you sell spare parts?\n\nThanks!",
      },
      {
        author: 'agent',
        message:
          "Hi Bob,\n\nI'm sorry to hear that. But don't worry, we can send you a new thermostat. Can you tell me the exact model of your fridge?\n\nBest,\n\nAcme Refrigerator Support",
      },
      {
        author: 'customer',
        message:
          "It's a SuperCooler 3008. I bought it 2 years ago. The serial number is 123456789.\n\nThanks!",
      },
      {
        author: 'agent',
        message:
          "Thanks, Bob. I've sent you an email with the link to the spare parts store. You can buy a new thermostat there.\n\nBest,\n\nAcme Refrigerator Support",
      },
    ],
  },
  {
    subject: 'How to defrost the freezer',
    status: 'resolved',
    category: 'maintenance',
    messages: [
      {
        author: 'customer',
        message:
          "Hi\nI've lost the manual for my fridge. How can I defrost the freezer? The controls are in Russian, and I don't understand them.\n\nThanks!",
      },
      {
        author: 'agent',
        message:
          'Hi, thanks for reaching out to us. You can find the English manual here: https://www.awesomefridge.com/manuals/123456789.pdf. The defrost instructions are on page 45.\n\nDoes this solve your problem?\n\nBest,\n\nAcme Refrigerator Support',
      },
      {
        author: 'customer',
        message: 'Yep, that did it, thanks!',
      },
      {
        author: 'agent',
        message: "You're welcome!",
      },
    ],
  },
  {
    subject: 'Do you sell vacuum cleaners?',
    status: 'resolved',
    category: 'other',
    messages: [
      {
        author: 'customer',
        message: "I'm looking for a new vacuum cleaner. Do you sell them?",
      },
      {
        author: 'agent',
        message:
          "Hi, thanks for reaching out to us.\n\nYou must be mistaken, we don't sell vacuum cleaners. We are a support team for Acme Refrigerator customers.\n\nBest,\n\nAcme Refrigerator Support",
      },
    ],
  },
  {
    subject: 'Lobster in the fridge',
    status: 'resolved',
    category: 'other',
    messages: [
      {
        author: 'customer',
        message:
          "Sorry to disturb you, but I have a question.\n\nCan I put a live lobster in the fridge? Will it die?\nI bought it at the supermarket, and they said it's fresh.\n\nThanks!",
      },
      {
        author: 'agent',
        message:
          "Hi, thanks for reaching out to us.\n\nI'm sorry, but this falls outside of our support scope. We can help you with technical issues, but not with questions about food.\n\nBest,\n\nAcme Refrigerator Support",
      },
      {
        author: 'customer',
        message: 'Oh, I see. Thanks anyway!',
      },
    ],
  },
];

const tickets: DbTicket[] = [];
const messages: DbMessage[] = [];

ticketsJson.forEach((ticket) => {
  let updatedAt = faker.date.recent({
    days: ticket.status === 'resolved' ? 3 : 1,
  });
  const customer = faker.helpers.arrayElement(customers);
  const product = faker.helpers.arrayElement(products);
  const agent = faker.helpers.arrayElement(agents);

  const ticketItem: DbTicket = {
    id: faker.string.uuid(),
    subject: ticket.subject,
    status: ticket.status,
    created_at: updatedAt.toISOString(),
    updated_at: updatedAt.toISOString(),
    customer_id: customer.id,
    product_id: product.id,
    category: ticket.category,
    messages: 0,
  };

  ticket.messages.forEach((message) => {
    messages.push({
      id: faker.string.uuid(),
      message: message.message,
      ticket_id: ticketItem.id,
      customer_id: message.author === 'customer' ? customer.id : null,
      agent_id: message.author === 'agent' ? agent.id : null,
      timestamp: updatedAt.toISOString(),
    });
    updatedAt = faker.date.recent({ days: 1, refDate: updatedAt });
  });

  ticketItem.messages = ticket.messages.length;

  if (ticket.status !== 'open') {
    ticketItem.agent_id = agent.id;
  }

  ticketItem.updated_at = updatedAt.toISOString();
  tickets.push(ticketItem);

  customer.tickets++;
  product.tickets++;
  if (ticket.status === 'open') {
    customer.openTickets++;
  }
});

const customersById = customers.reduce<Record<string, (typeof customers)[0]>>(
  (acc, customer) => {
    acc[customer.id] = customer;
    return acc;
  },
  {}
);

messages.forEach((message) => {
  if (!message.customer_id) {
    return;
  }

  const customer = customersById[message.customer_id];
  if (
    customer &&
    message.timestamp &&
    (!customer.updated_at || message.timestamp > customer.updated_at)
  ) {
    customer.updated_at = message.timestamp;
  }
});

let generated = false;
let generatingPromise: Promise<void> | null = null;

async function prepareMockDataInternal() {
  await schemaStore.getModel(EntityName.Product).bulkCreate(products);
  await schemaStore.getModel(EntityName.Agent).bulkCreate(agents);
  await schemaStore.getModel(EntityName.Customer).bulkCreate(customers);
  await schemaStore.getModel(EntityName.Ticket).bulkCreate(tickets);
  await schemaStore.getModel(EntityName.Message).bulkCreate(messages);
}

async function prepareMockData() {
  if (generated) {
    return;
  }

  if (generatingPromise) {
    await generatingPromise;
    return;
  }

  generatingPromise = prepareMockDataInternal();
  await generatingPromise;
  generated = true;
}

export async function resetMockData() {
  generated = false;
  generatingPromise = null;

  await prepareMockData();
}
