'use client';

import React, { useState, useEffect } from 'react';
import ModuleProfile from '../../../../../../views/ModuleProfile';
import { useParams } from 'next/navigation';
import { fetchModuleByModuleNo } from 'db/queries/moduleNo-module';

export default function ModulePage() {
  const { tab, moduleNo, academicYear } = useParams();
  const academicYearInt = parseInt(academicYear);
  const [module, setModule] = useState('');

  useEffect(() => {
    const fetchModuleTitle = async () => {
      try {
        const fetchedModule = await fetchModuleByModuleNo(moduleNo, academicYearInt);
        setModule(fetchedModule);
      } catch (error) {
        console.error('Error while fetching module title:', error);
      }
    };

    fetchModuleTitle();
  }, [academicYearInt, moduleNo]);

  return (
    <>
      <ModuleProfile tab={tab} moduleNo={moduleNo} moduleTitle={module.title} academicYear={academicYearInt} />
    </>
  );
}
