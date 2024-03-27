import PropTypes from 'prop-types';

// material-ui
import { CameraOutlined } from '@ant-design/icons';
import { Typography, Stack, CardMedia } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';

const RootWrapper = styled('div')(({ theme }) => ({
  width: 124,
  height: 124,
  borderRadius: '50%',
  border: `1px dashed ${theme.palette.primary.main}`,
  background: theme.palette.primary.lighter
}));

const DropzoneWrapper = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const PlaceholderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.primary.lighter, 0.75),
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': { opacity: 0.85 }
}));

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }) {
    const theme = useTheme();
  return (
    <>
      {type !== 'STANDARD' && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction='column'
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >

          {/* <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} /> */}
            <RootWrapper>
                <DropzoneWrapper>
                <PlaceholderWrapper
                    className="placeholder"
                >
                    <Stack spacing={0.5} alignItems="center">
                    <CameraOutlined style={{ color: theme.palette.secondary.main, fontSize: '2rem' }} />
                    <Typography color="secondary">Upload</Typography>
                    </Stack>
                </PlaceholderWrapper>
                </DropzoneWrapper>
            </RootWrapper>
            <Stack spacing={0}>
                <Typography align="center" variant="caption" color="secondary">
                    Allowed &lsquo;image/*&rsquo;
                </Typography>
                <Typography align="center" variant="caption" color="secondary">
                    *.png, *.jpeg
                    {/* , *.jpg, *.gif */}
                </Typography>
            </Stack>
          {/* <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Upload an excel file (.xlsx) containing project information</Typography>

            <Typography color="secondary">
              Drop files here or click to navigate through files on your machine
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          </Stack> */}
        </Stack>
      )}
      {type === 'STANDARD' && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <CameraOutlined style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}

PlaceholderContent.propTypes = {
  type: PropTypes.string
};
