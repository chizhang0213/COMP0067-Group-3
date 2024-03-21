'use server';

import db from 'db/index';

export async function deleteMarkingComp(compIndex, moduleNo, academicYear) {
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
  components.splice(compIndex, 1);

    try {
        const updateComponent = await db.scheme.update({
            where: { id: scheme.id },
            data: {
                components: components
            }
        });
    } catch (error) {
        console.error('Error while deleting the marking component:', error);
        throw error;
    }
}