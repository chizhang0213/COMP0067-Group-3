'use server';

import db from 'db/index';

export async function fetchTAInfoByTAId(TAId) {
  const TAInfo = await db.staff.findFirst({
    where: {
      id: TAId,
      userType: 'TA'
    }
  });
  console.log(TAInfo.firstName);
  return TAInfo;
}
