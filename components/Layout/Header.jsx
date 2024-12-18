"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const drawerWidth = 180;

const navigationItems = [
  { link: "/", text: "صفحه‌اصلی" },
  { link: "/travel-time", text: "زمان‌بندی سفر" },
  { link: "/next-arrivals", text: "زمان ورود قطار" },
  { link: "/stations", text: "ایستگاه‌ها" },
  { link: "/contactus", text: "تماس باما" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", pt: 5 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              sx={{ textAlign: "center", padding: "10px", margin: "0 10px" }}
              href={item.link}
            >
              {item.text}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <AppBar
          position="static"
          component="nav"
          sx={{
            padding: "7px 20px",
            backgroundColor: { xs: "transparent", sm: "#1976d2" },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon sx={{ fontSize: "60px" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link href="/" className="block w-fit">
                <Image
                  src="/images/logo.png"
                  alt="citydo-logo"
                  width={150}
                  height={100}
                  priority={true}
                />
              </Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navigationItems.map((item) => (
                <Button
                  component={Link}
                  href={item.link}
                  key={item.text}
                  sx={{ color: "#fff" }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
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
        </nav>
      </Box>
      <Link href="/" className="block w-fit mx-auto mt-6 sm:hidden">
        <Image
          src="/images/logo.png"
          width={220}
          height={100}
          alt="citydo-logo"
          priority={true}
        />
      </Link>
    </>
  );
}

export default Header;
