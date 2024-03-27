'use server';

import { revalidatePath } from '../../node_modules/next/cache';
import { redirect } from '../../node_modules/next/navigation';
import db from 'db/index';

export async function createModule(formState, formData) {
  try {
    const createdModule = await db.modules.create({
      data: {
        moduleNo: formData.get('moduleNo'),
        title: formData.get('title'),
        Lecturers: [],
        TAs: [],
        academicYear: parseInt(formData.get('academicYear')),
        createdLec: ''
      }
    });
    const course = await db.modules.findFirst({
      where: {
        moduleNo: formData.get('moduleNo'),
        academicYear: parseInt(formData.get('academicYear'))
      },
      select: {
        id: true
      }
    });
    const createdProjects = await db.projects.create({
      data: {
        moduleId: course.id,
        projects: []
      }
    });
    if (createdModule && createdProjects) {
      revalidatePath('/home');
      redirect('/home');
    } else {
      console.error('Failed to insert module data into the database.');
      throw new Error('Failed to insert module data into the database.');
    }
  } catch (error) {
    console.error('Error while inserting module data:', error);
    throw error;
  }
}
