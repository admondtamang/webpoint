import { genHash } from "@/utils/hash";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS_TO_CREATE = 20;

async function run() {
  const hash = await genHash("ram");
  const userData = Array(USERS_TO_CREATE)
    .fill(null)
    .map(() => {
      return {
        username: faker.internet.userName().toLowerCase(),
        url: faker.internet.url().toLocaleLowerCase(),
        password: hash,
      };
    });

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user })
  );

  await prisma.$transaction(createUsers);

  await prisma.$disconnect();
}

run();
