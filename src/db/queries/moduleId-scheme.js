'use server';

import db from 'db/index';

export async function fetchSchemeByModuleId(moduleId) {
  const scheme = await db.scheme.findFirst({
    where: {
      moduleId: moduleId
    }
  });
  console.log('The moduleId of this scheme is', scheme.components);
  return scheme?.components;
}
