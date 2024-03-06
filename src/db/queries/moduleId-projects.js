'use server';

import db from 'db/index';

export async function fetchProjectsByModuleId(moduleId) {
  const project = await db.projects.findFirst({
    where: {
      moduleId: moduleId
    },
    select: {
      projects: true
    }
  });
  return project;
}
