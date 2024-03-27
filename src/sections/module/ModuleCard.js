'use client';

import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useTheme from '@mui/system/useTheme';
import { useRouter } from 'next/navigation';
import { fetchProjectsByModuleId } from 'db/queries/moduleId-projects';

export default function ModuleCard({ data }) {
  const lecturerCount = data.Lecturers.length;
  const TACount = data.TAs.length;
  const theme = useTheme();
  const router = useRouter();
  const handleClickView = (moduleNo, academicYear) => {
    router.push(`/home/${moduleNo}/${academicYear}/projects`);
  };

  const [Projects, setProjects] = useState({ projects: [] });

  useEffect(() => {
    const fetchProjectsProjects = async () => {
      try {
        const fetchedProjects = await fetchProjectsByModuleId(data.id);
        setProjects(fetchedProjects || { projects: [] });
      } catch (error) {
        console.error('Error while fetching projects:', error);
      }
    };

    fetchProjectsProjects();
  }, [data.id]);

  const projectsCount = Projects.projects.length;

  return (
    <MainCard
      title={
        <Typography variant="h5" fontWeight="bold">
          {data.moduleNo}
        </Typography>
      }
      subheader={
        <Typography variant="subtitle1" fontWeight="regular" color={theme.palette.secondary.main}>
          {data.title}
        </Typography>
      }
      border={false}
      boxShadow
      sx={{ height: '230px', maxWidth: '270px', minWidth: '200px', margin: 'auto' }}
    >
      <Stack spacing={1} direction="column">
        <Stack direction="row" spacing={1} alignItems="center">
          <UserOutlined />
          <Typography variant="body2">{`${lecturerCount} lecturer${lecturerCount !== 1 ? 's' : ''}`}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <UserOutlined />
          <Typography variant="body2">{`${TACount} TA${TACount !== 1 ? 's' : ''}`}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <TeamOutlined />
          <Typography variant="body2">{`${projectsCount} group${projectsCount !== 1 ? 's' : ''}`}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button size="small" variant="contained" onClick={() => handleClickView(data.moduleNo, data.academicYear)}>
            View
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
}

ModuleCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    moduleNo: PropTypes.string.isRequired,
    academicYear: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    Lecturers: PropTypes.arrayOf(PropTypes.string).isRequired,
    TAs: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  Projects: PropTypes.shape({
    projects: PropTypes.array.isRequired
  }).isRequired
};
