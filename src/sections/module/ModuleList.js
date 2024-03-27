'use client';

import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ModuleCard from './ModuleCard';
import AddModuleButton from './PlusButtonCard';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { createModule } from '../../actions/create-module';

export default function ModuleList({ modules }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddModule = async () => {
    const moduleNoInput = document.getElementById('moduleNo');
    const titleInput = document.getElementById('title');
    const academicYearInput = document.getElementById('academicYear');

    const formData = new FormData();

    formData.append('moduleNo', moduleNoInput.value);
    formData.append('title', titleInput.value);
    formData.append('academicYear', academicYearInput.value);

    try {
      await createModule(null, formData);
      handleClose();
    } catch (error) {
      console.error('Error while adding module:', error);
    }
  };

  return (
    <>
      <Grid container spacing={1} rowGap={2}>
        {modules.map((module, id) => (
          <Grid key={id} item xs={12} md={4} lg={3} height={250}>
            <ModuleCard data={module} />
          </Grid>
        ))}

        <Grid item xs={12} md={4} lg={3}>
          <AddModuleButton onClick={handleOpen} sx={{ height: 250 }} />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" margin="auto" fullWidth>
        <DialogTitle>Create a New Module</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <label htmlFor="moduleNo" style={{ color: '#333' }}>
                  Module Code
                </label>
                <input
                  type="text"
                  id="moduleNo"
                  name="moduleNo"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <label htmlFor="title" style={{ color: '#333' }}>
                  Module Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <label htmlFor="academicYear" style={{ color: '#333' }}>
                  Academic Year
                </label>
                <input
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddModule} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired
};
