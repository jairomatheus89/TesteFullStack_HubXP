import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { dashboardService } from '@/services/dashboard-service';
import type { DashboardMetrics } from '@/types/dashboard';

import { Refresh } from "@mui/icons-material";

function Dashboard(){

  const [dashboardMet, setDashboardMet] = useState<DashboardMetrics>();

  const reloadMetrics = async () => {
      const metricsResponse = await dashboardService.getMetrics();

      setDashboardMet(metricsResponse);
    }

  useEffect(() => {
    const firstLoad = async () => {
      await reloadMetrics();
    }

    firstLoad();
  }, []);

  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        "& .cardsBox":{
          display:'flex',
          justifyContent: 'center',
          gap: 10
        },
        "& .kpi-card": {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'primary.main',
          p: 2,
          borderRadius: 2,
          alignItems: 'center',
          minWidth: 190,
          maxWidth: 240,
          "& .titleCard":{
            fontSize: 26
          },
          "& .cardValue":{
            fontSize: 20
          }
        },
      }}
    >
      <Typography sx={{fontSize: 28, marginBottom: 6}}>Dashboard</Typography>
      <Box className='cardsBox'>
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
      <IconButton onClick={() => reloadMetrics()}>
        <Refresh/>
      </IconButton>
    </Box>
  );
}

export default Dashboard;