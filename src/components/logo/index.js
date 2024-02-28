'use client';

import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Image from 'next/image';

// material-ui
import { ButtonBase } from '@mui/material';


// project import
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ reverse, isIcon, sx, to }) => (
  <NextLink href={!to ? APP_DEFAULT_PATH : to} passHref legacyBehavior>
    <ButtonBase disableRipple sx={sx}>
      <Image 
      src="/assets/images/logos/ucl_logo.png" alt="UCL" width="118" height="35" />
    </ButtonBase>
  </NextLink>
);

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;

