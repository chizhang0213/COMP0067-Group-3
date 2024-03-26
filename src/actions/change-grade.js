'use server';

import db from 'db/index';

import { createGrade } from './create-grade';

export async function changeGrade(moduleId, teamNo, moduleInputs, moduleTotals, individualScores, finalScores) {
  let gradeRecord = await db.grades.findFirst({
    where: {
      moduleId: moduleId,
      teamNo: parseInt(teamNo)
    }
  });

  if (!gradeRecord) {
    await createGrade(moduleId, teamNo);
    gradeRecord = await db.grades.findFirst({
      where: {
        moduleId: moduleId,
        teamNo: parseInt(teamNo)
      }
    });
  }
  console.log('TAMark before parsing:', gradeRecord.TAMark);
  const updatedTAMark = {
    ...gradeRecord.TAMark,
    ...moduleInputs
  };
  await db.grades.update({
    where: {
      id: gradeRecord.id
    },
    data: {
      TAMark: updatedTAMark,
      TAMarkComponent: { ...moduleTotals },
      TAMarkIndividual: { ...individualScores },
      TAMarkFinal: { ...finalScores }
    }
  });
}
