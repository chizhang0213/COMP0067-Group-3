const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.modules.create({
    data: {
      moduleNo: 'Rich',
      title: 'hello@prisma.com',
      maxSize: 4
    }
  });

  const allUsers = await prisma.modules.findMany();
  console.log(allUsers);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
