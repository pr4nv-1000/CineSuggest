import React from 'react';
import { Typography, useTheme } from '@mui/material';
import logo from '../../assests/logo.png';

const Logo = () => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
      <Typography fontWeight="700" fontSize="1.7rem">
        Cine<span style={{ color: theme.palette.primary.main }}>Suggest</span>
      </Typography>
    </div>
  );
};

export default Logo;
