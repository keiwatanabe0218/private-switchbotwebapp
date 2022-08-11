import React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ThemeProvider,
} from "@mui/material";
import { darkTheme } from "./darkTheme";

const CustomTypography = styled(Typography)({
  // flexGrow: 1,
});

export default function ButtonAppBar() {

  return (
    <div style={{ flexGrow: "1" }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed">
          <Toolbar>
            <CustomTypography variant="h6">
              <Box textAlign="left" sx={{ mx: 2 }}>
                Switchbot Viewer
              </Box>
            </CustomTypography>
            <div style={{ flexGrow: 1 }}></div>

          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
