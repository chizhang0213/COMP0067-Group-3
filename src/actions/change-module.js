'use server';

import { revalidatePath } from '../../node_modules/next/cache';
import { redirect } from '../../node_modules/next/navigation';
import db from 'db/index';

export async function changeModule(id, formState, formData) {
  try {
    const updatedModule = await db.modules.update({
      where: { id: id },
      data: {
        moduleNo: formData.get('moduleNo'),
        title: formData.get('title'),
        academicYear: parseInt(formData.get('academicYear'))
      }
    });
    if (updatedModule) {
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
