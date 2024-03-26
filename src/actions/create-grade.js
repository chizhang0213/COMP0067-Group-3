'use server';

import db from 'db/index';

import { fetchSchemeByModuleId } from 'db/queries/moduleId-scheme';
import { fetchProjectByTeamNo } from 'db/queries/teamNo-project';

function processComponents() {
  const TAMark = {};
  const lecMark = {};
  const TAMarkComponent = {};
  const lecMarkComponent = {};
  const TAMarkIndividual = {};
  const lecMarkIndividual = {};
  const TAMarkFinal = {};
  const lecMarkFinal = {};
  const peerReview = {};

  return { TAMark, lecMark, TAMarkComponent, lecMarkComponent, TAMarkIndividual, lecMarkIndividual, TAMarkFinal, lecMarkFinal, peerReview };
}

export async function createGrade(moduleId, teamNo) {
  console.log(`Creating grade for moduleId: ${moduleId}, teamNo: ${teamNo}`);
  const components = await fetchSchemeByModuleId(moduleId);
  console.log('Components are ', components);
  const course = await db.modules.findFirst({
    where: {
      id: moduleId
    }
  });
  const academicYearInt = parseInt(course.academicYear);
  const teamNoInt = parseInt(teamNo);

  const project = await fetchProjectByTeamNo(course.moduleNo, academicYearInt, teamNoInt);

  const { TAMark, lecMark, TAMarkComponent, lecMarkComponent, TAMarkIndividual, lecMarkIndividual, TAMarkFinal, lecMarkFinal, peerReview } =
    processComponents();

  const createdProject = await db.grades.create({
    data: {
      moduleId: moduleId,
      teamNo: teamNoInt,
      projectTitle: project.projectTitle,
      status: 'processing',
      TAMark,
      lecMark,
      TAMarkComponent,
      lecMarkComponent,
      TAMarkIndividual,
      lecMarkIndividual,
      TAMarkFinal,
      lecMarkFinal,
      peerReview
    }
  });

  console.log('Grade created successfully');
  return createdProject;
}
