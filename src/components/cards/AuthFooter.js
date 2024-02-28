'use client';

// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'flex-end'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          Copyright © 2024 UCL
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthFooter;


