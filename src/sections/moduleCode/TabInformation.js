'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useParams } from '../../../node_modules/next/navigation';
import { fetchModuleByModuleNo } from 'db/queries/moduleNo-module';

// project import
import { changeModule } from 'actions/change-module';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabInformation = () => {
  const { moduleNo, academicYear } = useParams();
  const academicYearInt = parseInt(academicYear);

  const [inputValues, setInputValues] = useState({
    moduleNo: '',
    title: '',
    academicYear: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await fetchModuleByModuleNo(moduleNo, academicYearInt);
        if (course) {
          setInputValues({
            moduleNo: course.moduleNo || '',
            title: course.title || '',
            academicYear: course.academicYear || ''
          });
        }
      } catch (error) {
        console.error('Error fetching module data:', error);
      }
    };

    fetchData();
  }, [moduleNo, academicYearInt]);

  const [open, setOpen] = useState(false);
  const [validation, setValidation] = useState({
    moduleNo: true,
    title: true,
    academicYear: true
  });

  const validateInputs = () => {
    const moduleNo = document.getElementById('moduleNo').value;
    const title = document.getElementById('title').value;
    const academicYear = document.getElementById('academicYear').value;

    const newValidation = {
      moduleNo: !!moduleNo,
      title: !!title,
      academicYear: !!academicYear
    };

    setValidation(newValidation);

    // Only open dialog if all inputs are valid
    return Object.values(newValidation).every(Boolean);
  };

  const handleClickOpen = () => {
    if (validateInputs()) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmChange = async () => {
    const moduleNoInput = document.getElementById('moduleNo');
    const titleInput = document.getElementById('title');
    const academicYearInput = document.getElementById('academicYear');

    const course = await fetchModuleByModuleNo(moduleNo, academicYearInt);

    const formData = new FormData();

    formData.append('moduleNo', moduleNoInput.value);
    formData.append('title', titleInput.value);
    formData.append('academicYear', academicYearInput.value);

    try {
      await changeModule(course.id, null, formData);
    } catch (error) {
      console.error('Error while adding module:', error);
    }
    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <label htmlFor="moduleNo" style={{ color: '#A9A9A9' }}>
            Module Code
          </label>
          <TextField
            value={inputValues.moduleNo}
            onChange={(e) => setInputValues({ ...inputValues, moduleNo: e.target.value })}
            error={!validation.moduleNo}
            helperText={!validation.moduleNo && 'This field is required.'}
            type="text"
            id="moduleNo"
            name="moduleNo"
            style={{
              width: '20%',
              borderRadius: '4px',
              borderColor: validation.moduleNo ? '#ccc' : 'red'
            }}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack spacing={1}>
          <label htmlFor="title" style={{ color: '#A9A9A9' }}>
            Module Title
          </label>
          <TextField
            value={inputValues.title}
            onChange={(e) => setInputValues({ ...inputValues, title: e.target.value })}
            error={!validation.title}
            helperText={!validation.title && 'This field is required.'}
            type="text"
            id="title"
            name="title"
            style={{
              width: '20%',
              borderRadius: '4px',
              borderColor: validation.title ? '#ccc' : 'red'
            }}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack spacing={1}>
          <label htmlFor="academicYear" style={{ color: '#A9A9A9' }}>
            Academic Year
          </label>
          <TextField
            value={inputValues.academicYear}
            onChange={(e) => setInputValues({ ...inputValues, academicYear: e.target.value })}
            error={!validation.academicYear}
            helperText={!validation.academicYear && 'This field is required.'}
            type="text"
            id="academicYear"
            name="academicYear"
            style={{
              width: '20%',
              borderRadius: '4px',
              borderColor: validation.academicYear ? '#ccc' : 'red'
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          Save Changes
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Confirm Changes'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to save these changes?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirmChange} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default TabInformation;
