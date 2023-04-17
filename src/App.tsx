import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export const App: React.FC = () => {
  return (
    <Box maxWidth={1240} marginX="auto">
      <Box
        paddingX={{ xs: 2, md: 4 }}
        height={90}
        display="flex"
        alignItems="center"
      >
        <Typography
          component="span"
          sx={{ color: "#0055B9" }}
          fontSize={{ xs: 30, md: 40 }}
          fontWeight={900}
        >
          TD
        </Typography>
        <Typography
          component="span"
          sx={{ color: "#3F3F3F" }}
          fontSize={{ xs: 30, md: 40 }}
          fontWeight={900}
        >
          ata конвертер
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Typography fontSize={16}>Перетащите архивы с tdata сюда</Typography>
          <Box
            display="flex"
            alignItems="center"
            gap={5}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Box>
              <TextField
                multiline
                rows={7}
                sx={{
                  width: 500,
                  maxWidth: "90vw",
                  border: "3px solid rgba(0, 97, 210, 1)",
                  borderRadius: 3,
                  marginTop: 2,
                  fieldset: {
                    border: "none",
                  },
                }}
              />
              <Box
                width={500}
                maxWidth="90vw"
                height={200}
                border="3px solid rgba(0, 97, 210, 1)"
                borderRadius={3}
                marginTop={2}
              ></Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                sx={{
                  width: 120,
                  height: 80,
                  borderRadius: 4,
                  background: "#0061D2 !important",
                  color: "white",
                  fontSize: 36,
                  fontWeight: "bold",
                }}
                variant="text"
              >
                GO!
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};
