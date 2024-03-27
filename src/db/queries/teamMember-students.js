'use server';

import db from 'db/index';

export async function fetchStudentsByUCLId(teamMember) {
  const students = await db.students.findMany({
    where: {
      uclId: {
        in: teamMember
      }
    }
  });
  return students;
}
