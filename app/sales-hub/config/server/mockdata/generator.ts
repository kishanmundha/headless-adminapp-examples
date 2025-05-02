import { faker } from '@faker-js/faker';
import { schemaStore } from '../schemaStore';
import { SystemUser } from '../../schema/systemuser';
import { Contact } from '../../schema/contact';
import { Deal, dealSchema } from '../../schema/deal';
import { CurrentUser } from '@/app/mockuser';
import { Company, companySchema } from '../../schema/company';
import { Note } from '../../schema/note';
import { Task, taskSchema } from '../../schema/task';
import { Appointment, appointmentSchema } from '../../schema/appointment';

type DbSystemUser = Omit<SystemUser, 'avatar'> & { avatar: string };

type DbCompany = Omit<Company, 'salesownerid' | 'logo'> & {
  salesownerid: string;
  logo: string;
};
type DbContact = Omit<Contact, 'avatar' | 'companyid'> & {
  avatar: string;
  companyid: string;
};
type DbDeal = Omit<Deal, 'companyid' | 'contactid' | 'salesownerid'> & {
  companyid: string;
  contactid: string;
  salesownerid: string;
};
type DbNote = Omit<Note, 'regardingobjectid'> & {
  regardingobjectid: string;
};
type DbAppointment = Omit<Appointment, 'regardingobjectid'> & {
  regardingobjectid: string;
};

type DbTask = Omit<Task, 'regardingobjectid'> & {
  regardingobjectid: string;
};

let generated = false;
let generatingPromise: Promise<void> | null = null;

async function prepareMockDataInternal(currentUser: CurrentUser) {
  const systemusers: DbSystemUser[] = new Array(10)
    .fill(null)
    .map((_, index) => {
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

  const companies: DbCompany[] = [];
  const contacts: DbContact[] = [];

  Array.from({ length: 50 }).forEach(() => {
    const company: DbCompany = {
      id: faker.string.uuid(),
      name: faker.company.name(),
      logo: faker.image.urlPicsumPhotos({
        width: 50,
        height: 50,
      }),
      website: faker.internet.url(),
      contactNumber: faker.phone.number(),
      salesownerid: faker.helpers.arrayElement(systemusers).id,
      revenue: faker.number.int({ min: 100000, max: 10000000 }),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipcode: faker.location.zipCode(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      sector: faker.helpers.arrayElement(
        companySchema.attributes.sector.options.map((option) => option.value)
      ),
      size: faker.helpers.arrayElement(
        companySchema.attributes.size.options.map((option) => option.value)
      ),
      notes: faker.lorem.paragraph(),
    };

    companies.push(company);

    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).forEach(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const contact: DbContact = {
        id: faker.string.uuid(),
        fullName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email: faker.internet.email({
          firstName,
          lastName,
        }),
        avatar: faker.image.urlPicsumPhotos(),
        companyid: company.id,
        phone: faker.phone.number(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString(),
      };

      contacts.push(contact);
    });
  });

  const deals: DbDeal[] = [];
  const notes: DbNote[] = [];
  const tasks: DbTask[] = [];
  const appointments: DbAppointment[] = [];

  Array.from({ length: 50 }).forEach(() => {
    const company = faker.helpers.arrayElement(companies);
    const contact = faker.helpers.arrayElement(
      contacts.filter((contact) => contact.companyid === company.id)
    );

    const salesownerid = faker.helpers.arrayElement(systemusers).id;
    const amount = faker.number.int({ min: 10000, max: 1000000 });

    const deal: DbDeal = {
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      companyid: company.id,
      category: faker.helpers.arrayElement(
        dealSchema.attributes.category.options.map((option) => option.value)
      ),
      amount,
      expectedCloseDate: faker.date.future().toISOString(),
      contactid: contact.id,
      salesownerid,
      stage: faker.helpers.arrayElement(
        dealSchema.attributes.stage.options.map((option) => option.value)
      ),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    deals.push(deal);

    function getStartDate(index: number) {
      if (index === 0) {
        return faker.date.past();
      }
      if (index === 1) {
        return faker.date.recent();
      }

      return faker.date.future();
    }

    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).forEach(() => {
      const note: DbNote = {
        id: faker.string.uuid(),
        subject: faker.lorem.sentence(),
        notetext: faker.lorem.paragraph(),
        regardingobjectid: deal.id,
        regardingobjecttype: 'deals',
        createdon: faker.date.past().toISOString(),
        updatedon: faker.date.recent().toISOString(),
      };

      notes.push(note);
    });

    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).forEach(
      (_, index) => {
        const start = getStartDate(index);
        const end = new Date(start);
        end.setHours(end.getHours() + 1);

        const task: DbTask = {
          id: faker.string.uuid(),
          subject: faker.lorem.sentence(),
          regardingobjectid: deal.id,
          regardingobjecttype: 'deals',
          status: faker.helpers.arrayElement(
            taskSchema.attributes.status.options.map((option) => option.value)
          ),
          createdon: faker.date.past().toISOString(),
          updatedon: faker.date.recent().toISOString(),
          scheduledend: start.toISOString(),
          scheduledstart: end.toISOString(),
        };

        tasks.push(task);
      }
    );

    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).forEach(
      (_, index) => {
        const start = getStartDate(index);
        const end = new Date(start);
        end.setHours(end.getHours() + 1);

        const appointment: DbAppointment = {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          regardingobjectid: deal.id,
          regardingobjecttype: 'deals',
          description: faker.lorem.paragraph(),
          status: faker.helpers.arrayElement(
            appointmentSchema.attributes.status.options.map(
              (option) => option.value
            )
          ),
          created_on: faker.date.past().toISOString(),
          updated_on: faker.date.recent().toISOString(),
          start: start.toISOString(),
          end: end.toISOString(),
        };

        appointments.push(appointment);
      }
    );
  });

  await schemaStore.getModel('systemusers').bulkCreate(systemusers);
  await schemaStore.getModel('companies').bulkCreate(companies);
  await schemaStore.getModel('contacts').bulkCreate(contacts);
  await schemaStore.getModel('deals').bulkCreate(deals);
  await schemaStore.getModel('notes').bulkCreate(notes);
  await schemaStore.getModel('tasks').bulkCreate(tasks);
  await schemaStore.getModel('appointments').bulkCreate(appointments);
}

export async function prepareMockData(currentUser: CurrentUser) {
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
}

export async function resetMockData(currentUser: CurrentUser) {
  generated = false;
  generatingPromise = null;

  await prepareMockData(currentUser);
}
