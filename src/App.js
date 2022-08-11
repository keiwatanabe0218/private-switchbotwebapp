import * as React from "react";
import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  ThemeProvider,
  Grid,
} from "@mui/material";

import { darkTheme } from "./components/darkTheme";
import Graph from "./components/Graph";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./utils/ddbDocClient";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

// Set the parameters.
const params = {
  TableName: "switchbot-tm",
};

export const getItem = async () => {
  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    console.log("Success :");
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

const App = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    // get DynamoDB data
    getItem().then((data) => {
      setItems(data.Items);
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Switchbot Temperature and Humidity
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Switchbot Temperature and Humidity
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={8}>
            <Box
              component="main"
              sx={{ p: 3, maxWidth: 1200 }}
              alignItems="center"
              justifyContent="center"
            >
              <Toolbar />
              <Graph data={items} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;
