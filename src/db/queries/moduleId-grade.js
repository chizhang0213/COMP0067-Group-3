'use server';

import db from 'db/index';

export async function fetchGradeByModuleId(moduleId, teamNo) {
  const grade = await db.grades.findFirst({
    where: {
      moduleId: moduleId,
      teamNo: teamNo
    }
  });
  console.log('The grade from TA mark is ', grade.TAMark);
  return grade;
}
