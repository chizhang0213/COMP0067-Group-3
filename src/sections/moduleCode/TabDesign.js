import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Grid, MenuItem, FormControlLabel, Stack, TextField, Switch } from '@mui/material';
import MainCard from 'components/MainCard';

import { fetchSchemeByModuleNo } from 'db/queries/moduleNo-scheme';
import SchemeOverview from 'sections/design-page/SchemeOverview';

const TabDesign = () => {
  const { academicYear, moduleNo } = useParams();
  const academicYearInt = parseInt(academicYear);

  const [scheme, setScheme] = useState([]);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const fetchedScheme = await fetchSchemeByModuleNo(moduleNo, academicYearInt);
        setScheme(fetchedScheme);
      } catch (error) {
        console.error('Error while fetching marking scheme:', error);
      }
    };

    fetchScheme();
  }, [moduleNo, academicYear]);

  return (
    <>
    <Grid container spacing={2}>
      {/* {scheme ? (
        // Render this if marking scheme is defined */}
        <SchemeOverview scheme={scheme}/>
      {/* ) : (
        // Render this if projects is undefined (still need to modify)
        <p>No marking scheme available.</p>
      )} */}
    </Grid>
    </>
  );
};

export default TabDesign;
