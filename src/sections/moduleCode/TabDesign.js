import React from 'react';
import { useParams } from 'next/navigation';

import useGenerateProjects from 'data/react-table';

const TabDesign = () => {
  const { academicYear, moduleNo } = useParams();
  const academicYearInt = parseInt(academicYear);
  const projects = useGenerateProjects({ moduleNo, academicYearInt });

  return (
    <div>
      <h2>Projects:</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h3>Project {index + 1}</h3>
            <p>TAId: {project.TAId}</p>
            <p>Leader: {project.leader}</p>
            <p>Project Title: {project.projectTitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabDesign;
