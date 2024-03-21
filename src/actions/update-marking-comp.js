'use server';

import db from 'db/index';

export async function updateMarkingComp(compIndex, compData, moduleNo, academicYear) {
  const course = await db.modules.findFirst({
    where: {
      moduleNo: moduleNo,
      academicYear: academicYear
    }
  });

  const scheme = await db.scheme.findFirst({
    where: {
      moduleId: course.id
    }
  });
  const components = scheme.components;
  components[compIndex] = compData;

    try {
        const updateComponent = await db.scheme.update({
            where: { id: scheme.id },
            data: {
                components: components
            }
        });
        // if (updateComponent) {
        //     revalidatePath('/home/'+moduleNo+'/'+academicYear+'/design');
        //     redirect('/home/'+moduleNo+'/'+academicYear+'/design');
        //   } else {
        //     console.error('Failed to insert module data into the database.');
        //     throw new Error('Failed to insert module data into the database.');
        //   }
    } catch (error) {
        console.error('Error while updating the marking component:', error);
        throw error;
    }
}