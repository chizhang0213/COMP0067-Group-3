'use client';

import React from 'react';
import MainCard from 'components/MainCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useTheme from '@mui/system/useTheme';
import { useRouter } from 'next/navigation';

export default function ModuleCard({ data }) {
  const lecturerCount = 0;
  const TACount = 0;
  const theme = useTheme();
  const router = useRouter();
  const handleClickView = (moduleNo) => {
    router.push(`/home/${moduleNo}`);
  };

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
          <Typography variant="body2">{'0 group'}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button size="small" variant="contained" onClick={() => handleClickView(data.moduleNo)}>
            View
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
}

ModuleCard.propTypes = {
  data: PropTypes.shape({
    moduleNo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lecturerId: PropTypes.arrayOf(PropTypes.string).isRequired,
    TAId: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};
