'use server';

import db from 'db/index';

export async function fetchProjectByTeamNo(moduleNo, academicYear, teamNo) {
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

  const project = projects.projects.find((p) => p.teamNo === teamNo);

  console.log('Project is', project);
  return project;
}
