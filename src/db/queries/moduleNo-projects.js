'use server';

import db from 'db/index';

export async function fetchProjectsByModuleNo(moduleNo, academicYear) {
  console.log(moduleNo);
  const course = await db.modules.findFirst({
    where: {
      moduleNo: moduleNo,
      academicYear: academicYear
    }
  });

  const projects = await db.projects.findFirst({
    where: {
      moduleId: course.id
    }
  });
  console.log('Module number is', moduleNo);
  return projects?.projects;
}
