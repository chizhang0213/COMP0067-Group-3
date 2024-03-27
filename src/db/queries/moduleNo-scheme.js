'use server';

import db from 'db/index';

export async function fetchSchemeByModuleNo(moduleNo, academicYear) {
//   console.log(academicYear);
  const course = await db.modules.findFirst({
    where: {
      moduleNo: moduleNo,
      academicYear: academicYear
    }
  });

  const scheme = await db.scheme.findFirst({
    where: {
      moduleId: course.id
    }
  });
//   console.log(scheme);
  return scheme?.components;
}
