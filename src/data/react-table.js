// project-imports
import { fetchProjectsByModuleNo } from 'db/queries/moduleNo-projects';
import { useState, useEffect } from 'react';

export default function useGenerateProjects({ moduleNo, academicYear }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await fetchProjectsByModuleNo(moduleNo, academicYear);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error while fetching projects:', error);
      }
    };

    fetchProjects();
  }, [moduleNo, academicYear]);

  return projects;
}
