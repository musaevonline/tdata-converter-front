import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

export const App: React.FC = () => {
  return (
    <>
      <Box paddingX={20} paddingY={4}>
        <Typography component="span" sx={{ color: '#0055B9' }} fontSize={40} fontWeight={900}>T</Typography>
        <Typography component="span" sx={{ color: '#3F3F3F' }} fontSize={40} fontWeight={900}>Data конвертер</Typography>
      </Box>
      <Box paddingX={20}>
        <Typography fontSize={18}>Перетащите архивы с tdata сюда</Typography>
        <Box display="flex" alignItems="center" gap={20}>
          <Box>
            <Box width={600} height={250} border="3px solid rgba(0, 97, 210, 1)" borderRadius={3} marginTop={2}></Box>
            <Box width={600} height={250} border="3px solid rgba(0, 97, 210, 1)" borderRadius={3} marginTop={2}></Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
            <Button sx={{ width: 270, height: 145, borderRadius: 70, background: '#0061D2 !important', color: 'white', fontSize: 56, fontWeight: 'bold' }} variant="text">GO!</Button>
            <Paper sx={{ width: 100, height: 100 }}></Paper>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </>
  );
}

