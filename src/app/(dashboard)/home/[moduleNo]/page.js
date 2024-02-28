'use client';

import React from 'react';
import ModuleProfile from '../../../../views/ModuleProfile';
import { useParams } from 'next/navigation';

export default function ModulePage() {
  const { tab, moduleNo } = useParams();

  return (
    <>
      <ModuleProfile tab={tab} moduleNo={moduleNo} title={null} />
    </>
  );
}
