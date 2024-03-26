'use server';

import db from 'db/index';

export async function changeStatus(moduleId, teamNo, status) {
  let gradeRecord = await db.grades.findFirst({
    where: {
      moduleId: moduleId,
      teamNo: parseInt(teamNo)
    }
  });

  await db.grades.update({
    where: {
      id: gradeRecord.id
    },
    data: {
      status: status
    }
  });
}
