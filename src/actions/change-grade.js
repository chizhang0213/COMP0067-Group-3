'use server';

import db from 'db/index';

import { createGrade } from './create-grade';

export async function changeGrade(
  moduleId,
  teamNo,
  moduleInputs,
  moduleTotals,
  individualScores,
  individualContributions,
  finalScores,
  peerReview
) {
  let gradeRecord = await db.grades.findFirst({
    where: {
      moduleId: moduleId,
      teamNo: parseInt(teamNo)
    }
  });

  let combinedIndividualMarks = individualScores.map((score) => {
    const contribution = individualContributions.find((c) => c.studentId === score.studentId)?.contribution;
    return { ...score, contribution };
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
      TAMarkIndividual: { ...combinedIndividualMarks },
      TAMarkFinal: { ...finalScores },
      peerReview: { ...peerReview }
    }
  });
}
