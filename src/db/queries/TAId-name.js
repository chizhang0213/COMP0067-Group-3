'use server';

import db from 'db/index';

export async function fetchTAInfoByTAId(TAId) {
  const TAInfo = await db.TAs.findFirst({
    where: {
      id: TAId
    }
  });
  console.log(TAInfo.firstName);
  return TAInfo;
}
