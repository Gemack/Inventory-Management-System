import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import "./Create.css";
import { useNavigate } from "react-router-dom";
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
  const [invPro, setinvPro] = useState([]);
  const [file, setFile] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open1, setOpen1] = useState(false);
  const [del, setDel] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

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

  const token = JSON.parse(localStorage.getItem("token"));

  //  ============================ This Function fetch data from the database ===================
  const getApiData = async () => {
    setLoading(true);
    const product = await axios.get("http://127.0.0.1:8000/api/all_inv", {
      headers: {
        Authorization: "Bearer " + token.access,
      },
    });
    setData(product.data);
    setLoading(false);
  };

  // ==============================================================================================

  //  This function get all available products
  const getProducts = async () => {
    try {
      const invProduct = await axios.get("http://127.0.0.1:8000/api/", {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });
      if (invProduct.status === 401) {
        localStorage.removeItem("user");
      }
      setinvPro(invProduct.data);
    } catch (err) {
      navigate("/");
      toast.error(
        "Access Token to this session as expired please refresh and login "
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //  =================================== This function delete entry from the database ==============

  // get id of to be deleted item
  const getDel = (id) => {
    setDel(id);
  };
  // ================
  // 2
  const deleteProduct = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/delete-inv/${del.id}`,
      {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      }
    );
    if (response.status === 204) {
      getApiData();
      toast.success("Entry Deleted");
    }
  };
  // ==================================================================================================================
  useEffect(() => {
    getApiData();
    getProducts();
  }, []);

  //  ============ This function update entery in the Database ========================================================
  // get id of to be updated item
  const getId = (id) => {
    setFile(id);
    handleDrawerOpen();
  };
  // ===================

  //

  const submit = async (e) => {
    e.preventDefault();
    try {
      const respons = await axios.post(
        `http://127.0.0.1:8000/api/update-inv/${file.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        }
      );
      setOpen(false);
      if (respons.status === 200) {
        toast.success("Data Updated");
        setFormData({
          product: "",
          sold: "",
          purchased: "",
        });
      } else {
        toast.warning("Empty Entry Data No Updated");
      }
    } catch (error) {
      return null;
    }
    getApiData();
  };

  useEffect(() => {});
  // =================================================================================================
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
      {/* ============================================================================================================== */}
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
                  <td>{p.product}</td>
                  <td>{p.sold}</td>
                  <td>{p.purchased}</td>
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
