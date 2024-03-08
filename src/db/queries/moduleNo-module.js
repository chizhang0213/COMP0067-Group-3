'use server';

import db from 'db/index';

export async function fetchAllModuleNos() {
  // Fetch all modules from the database
  const modules = await db.modules.findMany({
    select: {
      moduleNo: true, // Only select the moduleNo field
    }
  });

  // Extract module numbers from the modules array
  const moduleNos = modules.map(module => module.moduleNo);

  console.log('Fetched module numbers:', moduleNos);
  
  return moduleNos;
}