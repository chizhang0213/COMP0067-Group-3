'use server';

import db from 'db/index';

export async function createMarkingScheme(compData, moduleNo, academicYear) {
    console.log(academicYear);
    const course = await db.modules.findFirst({
        where: {
          moduleNo: moduleNo,
          academicYear: academicYear
        }
      });
    try {
        const createScheme = await db.scheme.create({
            data: {
                moduleId: course.id,
                components: [compData]
            }
        });
        // const course = await db.modules.findFirst({
        // where: {
        //     moduleNo: formData.get('moduleNo'),
        //     academicYear: parseInt(formData.get('academicYear'))
        // },
        // select: {
        //     id: true
        // }
        // });
        // const createdProjects = await db.projects.create({
        // data: {
        //     moduleId: course.id,
        //     projects: []
        // }
        // });
        // if (createdModule && createdProjects) {
        //   revalidatePath('/home');
        //   redirect('/home');
        // } else {
        //   console.error('Failed to insert module data into the database.');
        //   throw new Error('Failed to insert module data into the database.');
        // }
    } catch (error) {
        console.error('Error while creating the marking scheme:', error);
        throw error;
    }
}
