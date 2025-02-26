import { faker } from '@faker-js/faker';

faker.seed(1);

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

export const currentUser = {
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

export type CurrentUser = typeof currentUser;
