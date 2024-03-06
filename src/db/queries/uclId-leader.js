'use server';

import db from 'db/index';

export async function fetchLeaderByUCLId(uclId) {
  const leader = await db.students.findFirst({
    where: {
      uclId: uclId
    }
  });
  return leader;
}
