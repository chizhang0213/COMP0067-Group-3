'use client';

import React, { useState, useEffect } from 'react';
import ModuleProfile from '../../../../views/ModuleProfile';
import { useParams } from 'next/navigation';
import { fetchTitleByModuleNo } from 'db/queries/module-title';

export default function ModulePage() {
  const { tab, moduleNo } = useParams();
  const [moduleTitle, setTitle] = useState('');

  useEffect(() => {
    const fetchModuleTitle = async () => {
      try {
        const fetchedTitle = await fetchTitleByModuleNo(moduleNo);
        setTitle(fetchedTitle);
      } catch (error) {
        console.error('Error while fetching module title:', error);
      }
    };

    fetchModuleTitle();
  }, [moduleNo]);

  return (
    <>
      <ModuleProfile tab={tab} moduleNo={moduleNo} moduleTitle={moduleTitle} />
    </>
  );
}
