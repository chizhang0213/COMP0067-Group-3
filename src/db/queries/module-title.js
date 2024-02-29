'use server';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function fetchTitleByModuleNo(moduleNo) {
  const course = await prisma.modules.findFirst({
    where: {
      moduleNo: moduleNo
    },
    select: {
      title: true
    }
  });

  return course?.title;
}
