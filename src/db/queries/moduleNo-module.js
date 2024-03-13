'use server';

import db from 'db/index';

export async function fetchModuleByModuleNo(moduleNo, academicYear) {
  const course = await db.modules.findFirst({
    where: {
      moduleNo: moduleNo,
      academicYear: academicYear
    }
  });
  return course;
}
