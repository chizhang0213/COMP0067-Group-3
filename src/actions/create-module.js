'use server';

import { revalidatePath } from '../../node_modules/next/cache';
import { redirect } from '../../node_modules/next/navigation';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function createModule(formState, formData) {
  try {
    const createdModule = await prisma.modules.create({
      data: {
        moduleNo: formData.get('moduleNo'),
        title: formData.get('title'),
        maxSize: parseInt(formData.get('maxSize'))
      }
    });
    if (createdModule) {
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
