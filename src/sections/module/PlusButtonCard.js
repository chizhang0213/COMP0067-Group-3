import React from 'react';
import MainCard from 'components/MainCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

export default function PlusButtonCard({ onClick }) {
  return (
    <MainCard
      border={false}
      boxShadow
      sx={{
        height: '230px',
        maxWidth: '270px',
        minWidth: '200px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Stack spacing={1} direction="column" alignItems="center">
        <AddIcon style={{ fontSize: 48, color: '#bdbdbd' }} />
        <Typography variant="h5">New Module</Typography>
      </Stack>
    </MainCard>
  );
}

PlusButtonCard.propTypes = {
  onClick: PropTypes.func.isRequired
};
