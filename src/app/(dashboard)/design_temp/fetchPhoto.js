'use server';

import db from 'db/index';

export async function fetchStudentPhoto(prop) {
  const student = await db.students.findFirst({
    where: {
      uclId: 23055555
    }
  });
  const buffer = Uint8Array.from(student.photo);

    // Convert the Uint8Array buffer to a base64-encoded string
    const base64String = Buffer.from(buffer).toString('base64');

  return base64String;
}
