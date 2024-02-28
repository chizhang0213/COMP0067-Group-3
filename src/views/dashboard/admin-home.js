
'use client';

import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import ReportCard from 'components/cards/statistics/ReportCard';
import MainCard from 'components/MainCard';
import UserTable from 'sections/users/UserTable';

// import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import IncomeAreaChart from 'sections/dashboard/IncomeAreaChart';
// import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
// import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
// import SalesChart from 'sections/dashboard/SalesChart';
// import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

const avatar1 = '/assets/images/users/avatar-1.png';
const avatar2 = '/assets/images/users/avatar-2.png';
const avatar3 = '/assets/images/users/avatar-3.png';
const avatar4 = '/assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const AdminHome = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

  const theme = useTheme();

  function Buttons() {
    return (
        <>
        <Grid container item alignItems="center" justifyContent="space-between">
            <Grid item>
                <Button variant="contained">Back Up</Button>
            </Grid>
            <Grid item>
                <Button variant="contained">Export</Button>
            </Grid>
            <Grid item>
                <Button variant="contained">Audit Log</Button>
            </Grid>
        </Grid>
        </>
    );
  }
  function ModuleInfo() {
    return (
        <>
            <Grid item lg={6}>
                <ReportCard primary="30200" secondary="Existing Modules" color={theme.palette.secondary.main}/>
            </Grid>
            <Grid item lg={6}>
                <ReportCard primary="30200" secondary="Past Modules" color={theme.palette.secondary.main}/>
            </Grid>
        </>
    );
  }
  function PageViews(){
    return(
        <>
            <Grid item lg={12}>
                <Typography variant="h5">Page Views</Typography>
            </Grid>
        </>
    );
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <Grid container alignItems="center" item xs={6} spacing={3}>
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'block' } }} />
          <Buttons/>
          <ModuleInfo/>
        </Grid>
        <Grid container item xs={6} spacing={3}>
            <PageViews/>
        </Grid>

        <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
            <Typography variant="h5">User Accounts</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
            <UserTable />
        </MainCard>
      </Grid>

      {/* <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} /> */}

    </Grid>
  );
};

export default AdminHome;
