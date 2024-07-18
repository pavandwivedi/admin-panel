import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const users = [
  { label: "All User" }, 
];
const categories = [
  { label: "Fun" }, 
  { label: "Sports" }, 
  { label: "Music" }, 

];
const creates = [
  { label: "Create User" }, 
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Menu = ({ setActiveComponent }) => {
  const [opens, setOpens] = useState(false);
  const [user, setUser] = useState(false);
  const [category, setCategory] = useState(false);
  const [create, setCreateUser] = useState(false);
  const [logout, setLogout] = useState(false);

  //  Handle all menus item click and set active component  in dashboard
  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setOpen(false);
    navigate("/");
  };

  return (
    <Box sx={{bgcolor:"#051e34",height:'100vh'}}>
      <Box
        sx={{
          bgcolor: user ? "#051e34" : "#051e34",
          pb: user ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setUser(!user)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: user ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: user ? 1 : 0 } },
          }}
        >
          {/* <ListItemIcon sx={{ color: 'white' }}>
                    icon
                  </ListItemIcon> */}
          <ListItemText
            primary="Users"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: user ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: user ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>

        {/* users */}
        {user &&
          users.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
              component={Link}
              onClick={() => handleMenuItemClick(item.label)} // handle menus item click
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box>        

      <Box
        sx={{
          bgcolor: category ? "#051e34" : "#051e34",
          pb: category ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setCategory(!category)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: category ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: category ? 1 : 0 } },
          }}
        >
          {/* <ListItemIcon sx={{ color: 'white' }}>
                    icon
                  </ListItemIcon> */}
          <ListItemText
            primary="Category"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: category ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: category ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>

        {/* categorys User*/}
        {category &&
          categories.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
              component={Link}
              onClick={() => handleMenuItemClick(item.label)} // handle menus item click
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box> 

      <Box
        sx={{
          bgcolor: create ? "#051e34" : "#051e34",
          pb: create ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setCreateUser(!create)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: create ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: create ? 1 : 0 } },
          }}
        >
          {/* <ListItemIcon sx={{ color: 'white' }}>
                    icon
                  </ListItemIcon> */}
          <ListItemText
            primary="Create User"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: create ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              color: "white",
              transform: create ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>

        {/* creates */}
        {create &&
          creates.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 6, minHeight: 32, color: "white" }}
              component={Link}
              onClick={() => handleMenuItemClick(item.label)} // handle menus item click
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          ))}
      </Box> 

      <Box
        sx={{
          bgcolor: logout ? "#051e34" : "#051e34",
          pb: logout ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          // onClick={() => setLogout(!logout)}
          onClick={handleOpen}
          sx={{
            px: 3,
            pt: 2.5,
            pb: logout ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: logout ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 15,
              color: "white",
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: logout ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
        </ListItemButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to Logout
            </Typography>
            <Button onClick={handleLogout}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Menu;
