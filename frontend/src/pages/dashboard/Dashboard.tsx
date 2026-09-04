import { useState, useEffect } from 'react';
import { Box, colors, Typography } from '@mui/material';

import { dashboardService } from '@/services/dashboard-service';

import type { DashboardMetrics } from '@/types/dashboard';

function Dashboard(){
  const [dashboardMet, setDashboardMet] = useState<DashboardMetrics>();

  useEffect(() => {
    const loadMetrics = async () => {
      const metricsResponse = await dashboardService.getMetrics();

      setDashboardMet(metricsResponse);
    }

    loadMetrics();
  }, []);

  return(
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        //background: colors.blue[400],

        "& > .kpi-card": {
          display: 'flex',
          flexDirection: 'column',
          background: colors.blue[400],
          p: 2,
          borderRadius: 2,
          alignItems: 'center',
          "& .titleCard":{
            color: 'common.white',
            fontSize: 26
          },
          "& .cardValue":{
            color: 'common.black',
            fontSize: 20
          }
        },
      }}
    >
      <Box className='kpi-card'>
        <Typography className='titleCard' variant='h6'>
          Valor Total
        </Typography>
        <Typography className='cardValue' variant='subtitle1'>
          R$:{dashboardMet?.valorTotal}
        </Typography>
      </Box>
      <Box className='kpi-card'>
        <Typography className='titleCard' variant='h6'>
          Valor Medio
        </Typography>
        <Typography className='cardValue' variant='subtitle1'>
          R$:{dashboardMet?.valorMedio}
        </Typography>
      </Box>

      <Box className='kpi-card'>
        <Typography className='titleCard' variant='h6'>
          Total Pedidos
        </Typography>
        <Typography className='cardValue' variant='subtitle1'>
          {dashboardMet?.totalPedidos}
        </Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;