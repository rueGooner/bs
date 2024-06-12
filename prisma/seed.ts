import { faker } from '@faker-js/faker';

const fakeUser = (): any => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName,
    lastName,
  });

  return {
    firstName,
    lastName,
    email,
    password: faker.internet.password(),
  };
};

async function main() {
  console.log('the main', fakeUser());
}

main();
