import { Navbar, Container } from "react-bootstrap";
import "./Navbars.css";

// NAVBAR 2
import { useState, useEffect } from "react";
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

// Create Page Navbar
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
  const [invPro, setinvPro] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    sold: "",
    purchased: "",
  });
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //  This function get all available products
  const token = JSON.parse(localStorage.getItem("token"));
  const getProducts = async () => {
    const invProduct = await axios.get("http://127.0.0.1:8000/api/", {
      headers: {
        Authorization: "Bearer " + token.access,
      },
    });
    setinvPro(invProduct.data);
  };

  // ================================== This function Post data into the database ==========================
  const submit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/create-inv",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        }
      );
      api();
      setOpen(false);
      console.log(res.status);
      toast.success("Entry Successful");
      setFormData({ product: "", sold: "", purchased: "" });
    } catch (error) {
      console.log(error);
      toast.error("Data entry missing");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ==============================================================================
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
                name="product"
                value={formData.product}
              >
                <option></option>
                {invPro.map((inv) => (
                  <option value={inv.pk} key={inv.pk}>
                    {inv.name}
                  </option>
                ))}
              </select>
            </div>
            <Divider />
            <div className="goods-in-out">
              <InputLabel htmlFor="goods-in">Goods in</InputLabel>
              <Input
                style={{ width: "100% " }}
                value={formData.purchased}
                onChange={onChange}
                name="purchased"
                type="number"
                inputProps={{ min: "0" }}
              />
            </div>
            <Divider />
            <div className="goods-in-out">
              <InputLabel htmlFor="goods-out">Goods Out</InputLabel>
              <Input
                value={formData.sold}
                name="sold"
                onChange={onChange}
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
