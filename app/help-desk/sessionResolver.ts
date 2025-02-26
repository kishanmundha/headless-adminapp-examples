import { SessionResolver } from '@headless-adminapp/app/auth';
import { faker } from '@faker-js/faker';

export const sessionResolver: SessionResolver = async () => {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    exp: Date.now() + 1000 * 60 * 60 * 24,
    fullName: faker.person.fullName(),
    profilePicture: faker.image.urlPicsumPhotos(),
  };
};
