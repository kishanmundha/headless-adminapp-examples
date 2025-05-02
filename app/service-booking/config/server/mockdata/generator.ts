import { faker } from '@faker-js/faker';
import { schemaStore } from '@/app/service-booking/config/server/schemaStore';
import { User } from '@/app/service-booking/config/schema/user';
import { Customer } from '@/app/service-booking/config/schema/customer';
import { Appointment } from '@/app/service-booking/config/schema/appointment';
import { Service } from '@/app/service-booking/config/schema/service';
import { EntityName } from '../../enums';
import type { CurrentUser } from '../../../../mockuser';

type DbCustomer = Omit<Customer, 'avatar'> & {
  avatar: string;
  product_id?: string | null;
};

type DbService = Service;
type DbUser = Omit<User, 'avatar'> & { avatar: string };

type DbAppointment = Omit<Appointment, 'customer_id' | 'user_id'> & {
  customer_id: string;
  user_id: string;
};

let generated = false;
let generatingPromise: Promise<void> | null = null;

async function prepareMockDataInternal(currentUser: CurrentUser) {
  const users: DbUser[] = new Array(2).fill(null).map((_, index) => {
    if (index === 0) {
      return {
        ...currentUser,
      };
    }

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

  const services: DbService[] = new Array(10).fill(null).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
  }));

  const customers: DbCustomer[] = new Array(30).fill(null).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

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
    };
  });

  const appointments: DbAppointment[] = new Array(100).fill(null).map(() => {
    const customer = faker.helpers.arrayElement(customers);
    const user = faker.helpers.arrayElement(users);

    const start = faker.date.anytime();
    const end = faker.date.between({
      from: start,
      to: new Date(start.getTime() + 1000 * 60 * 60 * 2),
    });

    return {
      id: faker.string.uuid(),
      customer_id: customer.id,
      user_id: user.id,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: false,
      title: faker.lorem.sentence(),
    };
  });

  await schemaStore.getModel(EntityName.Service).bulkCreate(services);
  await schemaStore.getModel(EntityName.User).bulkCreate(users);
  await schemaStore.getModel(EntityName.Customer).bulkCreate(customers);
  await schemaStore.getModel(EntityName.Appointment).bulkCreate(appointments);
}

async function prepareMockData(currentUser: CurrentUser) {
  if (generated) {
    return;
  }

  if (generatingPromise) {
    await generatingPromise;
    return;
  }

  generatingPromise = prepareMockDataInternal(currentUser);
  await generatingPromise;
  generated = true;
  generatingPromise = null;
}

export async function resetMockData(currentUser: CurrentUser) {
  generated = false;
  generatingPromise = null;

  await prepareMockData(currentUser);
}
