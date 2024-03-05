'use server';

import db from 'db/index';

export async function fetchTitleByModuleNo(moduleNo) {
  const course = await db.modules.findFirst({
    where: {
      moduleNo: moduleNo
    },
    select: {
      title: true
    }
  });
  return course?.title;
}
