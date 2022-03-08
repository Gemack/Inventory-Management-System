import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import "./Create.css";
import { toast } from "react-toastify";
import img from "./inventory 2.jpg";
import { CreateNavbar } from "../../Components/Navbars/Navbars";
import { Table } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Tooltip,
  Drawer,
  Divider,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  DialogTitle,
  InputLabel,
  Input,
} from "@material-ui/core";
import { AiOutlineEnter } from "react-icons/ai";
import { Pagination } from "@material-ui/lab";

const drawerWidth = 441;

// For the Dialog box
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "black",
    },
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

const Create = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open1, setOpen1] = useState(false);
  const [del, setDel] = useState([]);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const [formData, setFormData] = useState({ Product: "", Gin: "", Gout: "" });

  const { Product, Gin, Gout } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //  This Function fetch data from the database
  const getApiData = async () => {
    setLoading(true);
    const product = await axios.get("http://localhost:8000/api/products");
    setData(product.data);
    setLoading(false);
    // return data;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //  This function delete entry from the database

  const getDel = (id) => {
    setDel(id);
    console.log(del);
  };
  const deleteProduct = async () => {
    const response = await axios.delete(
      `http://localhost:8000/api/products/${del.id}`
    );
    if (response.status === 200) {
      getApiData();
      toast.success("Entry Deleted");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getId = (id) => {
    setFile(id);
    handleDrawerOpen();
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/products/${file.id}`,
        formData
      );
      setOpen(false);
      setFormData({ Product: "", Gin: "", Gout: "" });
      toast.success("Data Updated");
    } catch (error) {
      console.log(error);
    }
    getApiData();
  };

  return (
    <div>
      <CreateNavbar api={getApiData} />

      {/* =================================== Dialogue box ============================================ */}
      <div>
        <Dialog
          open={open1}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"This Data will be deleted permanent"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are You Sure You Want to Delete this entry ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleClose();
                deleteProduct();
              }}
              color="primary"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

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
            <Tooltip title="Update Product">
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                style={{ margin: "2rem", width: "100%" }}
              >
                Update <AiOutlineEnter />
              </Button>
            </Tooltip>
          </div>
        </form>
      </Drawer>
      {loading ? (
        <CircularProgress
          style={{
            width: "4rem",
            color: "black",
            margin: "15rem auto",
            display: "block",
          }}
        />
      ) : (
        <div className="create_table_container">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th style={{ color: "blue" }}>id</th>
                <th style={{ color: "blue" }}>Name of Product</th>
                <th style={{ color: "blue" }}>Goods in</th>
                <th style={{ color: "blue" }}>Goods out</th>
                <th style={{ color: "blue" }}>E & D</th>
              </tr>
            </thead>
            <tbody>
              {data.slice((page - 1) * 10, (page - 1) * 10 + 10).map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.Product}</td>
                  <td>{p.Gin}</td>
                  <td>{p.Gout}</td>
                  <td>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Tooltip title="Edit Record" placement="right">
                        <span>
                          <BiEdit
                            size={30}
                            style={{
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              getId(p);
                            }}
                          />
                        </span>
                      </Tooltip>

                      <Tooltip title="Delete Record" placement="right">
                        <span>
                          <MdDeleteForever
                            onClick={() => {
                              handleClickOpen();
                              getDel(p);
                            }}
                            size={30}
                            style={{
                              color: "red",
                              cursor: "pointer",
                            }}
                          />
                        </span>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            count={(data?.length / 5).toFixed(0)}
            style={{
              padding: "1.1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              color: "black",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Create;
