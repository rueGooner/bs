import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    roleId: 3,
  };
};

async function main() {
  const roles = [{ name: 'ADMIN' }, { name: 'STAFF' }, { name: 'CLIENT' }];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  const [firstUser, secondUser] = await Promise.all([fakeUser(), fakeUser()]);

  await prisma.user.upsert({
    where: { email: firstUser.email },
    update: {},
    create: firstUser,
  });

  await prisma.user.upsert({
    where: { email: secondUser.email },
    update: {},
    create: secondUser,
  });
}

main();
