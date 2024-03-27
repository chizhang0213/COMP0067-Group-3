'use client';

import { useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, Stack, Typography } from '@mui/material';

// project imports
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import UploadAvatar from 'sections/dropzone/Avatar';
import UploadSingleFile from 'sections/dropzone/SingleFile';
import UploadMultiFile from 'sections/dropzone/MultiFile';
import ProcessFile from 'actions/dropzone/process-files';
import ProcessImages from 'actions/dropzone/process-images';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import IconButton from 'components/@extended/IconButton';

// assets
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import StudentPhotoUpload from 'sections/dropzone/StudentPhotoUpload';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const DropzonePage = () => {
  const [list, setList] = useState(true);

  return (
    <Page title="Dropzone">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard
            title="Reset Project Data"
          >
            <Formik
              initialValues={{ files: null }}
              onSubmit={() => {
                // submit form
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Avatar is a required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <UploadMultiFile
                          showList={false}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          error={touched.files && !!errors.files}
                          onUpload={ProcessFile}
                        />
                      </Stack>
                      {touched.files && errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.files}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>

        <Grid item xs={12}>
          <MainCard
            title="Upload Student Pictures"
            secondary={
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <IconButton color={list ? 'primary' : 'secondary'} size="small" onClick={() => setList(true)}>
                  <AppstoreOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
                <IconButton color={list ? 'secondary' : 'primary'} size="small" onClick={() => setList(false)}>
                  <UnorderedListOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            }
          >
            <Formik
              initialValues={{ files: null }}
              onSubmit={() => {
                // submit form
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Avatar is a required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <StudentPhotoUpload
                          showList={list}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          error={touched.files && !!errors.files}
                          onUpload={ProcessImages}
                        />
                      </Stack>
                      {touched.files && errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.files}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>

        {/* <Grid item xs={12}>
          <MainCard title="Upload Student Pictures">
            <Formik
              initialValues={{ files: null }}
              onSubmit={() => {
                // submit form
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Avatar is a required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack alignItems="center">
                        <Stack spacing={1.5} alignItems="center">
                          <UploadAvatar setFieldValue={setFieldValue} file={values.files} error={touched.files && !!errors.files} />
                          <Stack spacing={0}>
                            <Typography align="center" variant="caption" color="secondary">
                              Allowed &lsquo;image/*&rsquo;
                            </Typography>
                            <Typography align="center" variant="caption" color="secondary">
                              *.png, *.jpeg
                              , *.jpg, *.gif
                            </Typography>
                          </Stack>
                        </Stack>
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                        <Button color="error" onClick={() => setFieldValue('files', null)}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid> */}
      </Grid>
    </Page>
  );
};

export default DropzonePage;
