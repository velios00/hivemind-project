import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path: string) => {
    handleCloseUserMenu();
    navigate(path);
  };
  //ricordati di centrare il testo hivemind senza boiate
  return (
    <AppBar position="static" sx={{ backgroundColor: "#B34FE5" }}>
      <Toolbar flex-row-reverse gap={2}>
        <Typography
          variant="h6"
          component="a"
          onClick={() => navigate("/")}
          sx={{
            textAlign: "center",
            flexGrow: 1,
            fontWeight: 800,
            cursor: "pointer",
            color: "inherit",
          }}
        >
          HiveMind.
        </Typography>
        <Box>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => handleNavigate("/profile")}>
              Profilo
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("/logout")}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
