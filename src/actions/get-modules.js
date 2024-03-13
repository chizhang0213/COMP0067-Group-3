'use server';

import { revalidatePath } from '../../node_modules/next/cache';
import { redirect } from '../../node_modules/next/navigation';
import db from 'db/index';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function getModules() {
    try {
      return await db.modules.findMany({
        select: {
          moduleNo: true,
          title: true,
          academicYear: true
          // Add any other fields you want to display in the menu
        }
      });
    } catch (error) {
      console.error('Error while fetching modules:', error);
      throw error;
    }
  }
  