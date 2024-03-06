'use client';

import React, { useState, useEffect } from 'react';
import ProjectProfile from '../../../../../../../views/ProjectProfile';
import { useParams } from 'next/navigation';
import { fetchTitleByModuleNo } from 'db/queries/module-title';
import { fetchProjectByTeamNo } from 'db/queries/teamNo-project';

export default function ProjectPage() {
  const { tab, moduleNo, academicYear, teamNo } = useParams();
  const [moduleTitle, setTitle] = useState('');
  const [project, setProject] = useState('');
  const academicYearInt = parseInt(academicYear);
  const teamNoInt = parseInt(teamNo);

  useEffect(() => {
    const fetchModuleTitle = async () => {
      try {
        const fetchedTitle = await fetchTitleByModuleNo(moduleNo);
        setTitle(fetchedTitle);

        const fetchedProject = await fetchProjectByTeamNo(moduleNo, academicYearInt, teamNoInt);
        setProject(fetchedProject);
      } catch (error) {
        console.error('Error while fetching module title:', error);
      }
    };

    fetchModuleTitle();
  }, [academicYearInt, moduleNo, teamNoInt]);

  return (
    <>
      <ProjectProfile
        tab={tab}
        moduleNo={moduleNo}
        moduleTitle={moduleTitle}
        academicYear={academicYear}
        projectTitle={project.projectTitle}
      />
    </>
  );
}
