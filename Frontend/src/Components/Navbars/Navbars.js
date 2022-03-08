import { Navbar, Container } from "react-bootstrap";
import "./Navbars.css";

// NAVBAR 2
import { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { MdCreateNewFolder } from "react-icons/md";
import {
  Tooltip,
  Drawer,
  AppBar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import { InputLabel, Input } from "@material-ui/core";
import { AiOutlineEnter, AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import img from "./Inventory one.jpg";
import axios from "axios";

// Home page navabr
export const HomeNavbar = () => {
  return (
    <div>
      <Navbar bg="primary" variant="light">
        <Container className="home_nav_con">
          <h1 className="heading nav-heading">inventory managment system </h1>
        </Container>
      </Navbar>
    </div>
  );
};

// This Navbar his for the second page
const drawerWidth = 540;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export const CreateNavbar = ({ api }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({ Product: "", Gin: "", Gout: "" });

  const { Product, Gin, Gout } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // This function Post data into the database
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/products", formData);
      api();
      setOpen(false);
      toast.success("Entry Successful");
      setFormData({ Product: "", Gin: "", Gout: "" });
    } catch (error) {
      console.log(error);
      toast.error("Data entry missing");
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Navbar bg="primary" variant="light">
          <Typography variant="h6" noWrap className={classes.title}>
            <Container className="home_nav_con">
              <Link to="/" className="link-home">
                <AiFillHome size={30} />
                Home
              </Link>
              <h1 className="heading nav-create">
                inventory managment system{" "}
              </h1>
            </Container>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <Tooltip title="Create New Entry" placement="left-start">
              <span>
                <MdCreateNewFolder size={75} />
              </span>
            </Tooltip>
          </IconButton>
        </Navbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
      {/*======================== Create Drawer  ===============================================================*/}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <img src={img} className="nav-img" alt="nav-pic" />
        <Divider />
        <form onSubmit={submit}>
          <div className="label-main">
            <div className="label-select">
              <label htmlFor="name">Product</label>
              <select
                onChange={onChange}
                name="Product"
                id="name"
                value={Product}
              >
                <option></option>
                <option>Power Generator</option>
                <option> Thermocool Refrigerator</option>
                <option>Thermocool Air Conditional</option>
                <option>Solar Panel</option>
                <option>Smart Tv set</option>
                <option>Sony Sound System</option>
                <option>Thermocool Standing fan</option>
                <option>Fan</option>
                <option>DSTV Decoder</option>
                <option>Sony Playstation</option>
              </select>
            </div>
            <Divider />
            <div className="goods-in-out">
              <InputLabel htmlFor="goods-in">Goods in</InputLabel>
              <Input
                style={{ width: "100% " }}
                value={Gin}
                onChange={onChange}
                name="Gin"
                id="Gin"
                type="number"
                inputProps={{ min: "0" }}
              />
            </div>
            <Divider />
            <div className="goods-in-out">
              <InputLabel htmlFor="goods-out">Goods Out</InputLabel>
              <Input
                value={Gout}
                name="Gout"
                onChange={onChange}
                id="Gout"
                type="number"
                inputProps={{ min: "0" }}
                style={{ width: "100% " }}
              />
            </div>
          </div>
          <Divider />
          <div className="button-div">
            <Tooltip title="send input">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "2rem", width: "100%" }}
              >
                Enter <AiOutlineEnter />
              </Button>
            </Tooltip>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
