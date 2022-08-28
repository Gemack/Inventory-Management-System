import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import { Container } from "react-bootstrap";
import { HomeNavbar } from "../../Components/Navbars/Navbars";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiOutlineFileProtect, AiOutlineLogin } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import Showcase from "../../Components/Showcase/Showcase";
import {
  Tooltip,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = ({ login, user, logout }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(user);
  // ============================== This Function get all Product from the database ====================
  const getProducts = async () => {
    try {
      const product = await axios.get(
        "http://127.0.0.1:8000/api/product-detail"
      );
      setProduct(product.data);
    } catch {}
  };

  // ========================== This function get data from the server ==================================
  const getData = async () => {
    try {
      const product = await axios.get("http://127.0.0.1:8000/api/latest_inv");
      setData(product.data);
    } catch {}
  };

  // ======================================================================================================
  useEffect(() => {
    getData();
    getProducts();
  }, []);

  const [key, setKey] = useState("");

  const onChange = (e) => {
    setKey(e.target.value);
  };

  // Nicely format the Product price
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // =================================== Logging Function=====================================
  const submit = async () => {
    const file = { username: "emack", password: key };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        file
      );
      toast.success("Correct Password");
      setKey("");
      //======================== pass from the parent to render the user state in the parent
      login();
      // =====================================================
      handleClose();
      // navigate("/create");
      console.log(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
    } catch (error) {
      toast.error("Wrong Password");
    }
  };

  const logoutuser = () => {
    logout();
    localStorage.removeItem("token");
  };

  return (
    <div className="Homepage">
      {/* ==================================== Password pop up dialog =====================================*/}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Manage Inventory and product you must be authenticated please
              provide password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Login Password"
              type="password"
              fullWidth
              onChange={onChange}
              value={key}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submit} color="primary">
              Log in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/*============================================================================================================== */}
      <HomeNavbar />
      <Showcase data={data} />{" "}
      {/* The data passed here will be passed to the carosel for displaying slide */}
      <Container className="home_md">
        {user ? (
          <div className="manage">
            <Tooltip
              title="Add and keep record of your inventories"
              placement="top-start"
            >
              <div className="inventory">
                <Link to="/create" style={{ textDecoration: "none" }}>
                  <BsFillJournalBookmarkFill size={40} color="white" />
                  <span>Manage Inventory</span>
                </Link>
              </div>
            </Tooltip>
            <button className="logout" onClick={() => logoutuser()}>
              <BiLogOutCircle />
              LOGOUT
            </button>
            <Tooltip
              title="Add new product to your inventories"
              placement="top-start"
            >
              <div className="product">
                <Link to="/product" style={{ textDecoration: "none" }}>
                  <AiOutlineFileProtect size={40} color="white" />
                  <span>Manage Products</span>
                </Link>
              </div>
            </Tooltip>
          </div>
        ) : (
          <button className="login" onClick={handleClickOpen}>
            <AiOutlineLogin />
            LOGIN
          </button>
        )}
      </Container>
      <h3 style={{ textAlign: "center", color: "blue" }}>
        ALL AVAILABLE PRODUCTS
      </h3>
      <Container className="Products-container">
        {product.map((p) => (
          <Link to={`/detail/${p.id}`} className="product-box">
            <Tooltip
              title="You Need to be logged in to view product details and transactions"
              placement="top-start"
            >
              <div>
                <div>
                  <h4>Product Name</h4> <span>{p.name}</span>
                </div>
                <hr />
                <h4>
                  Product Price:{" "}
                  <span>
                    <span>&#8358;</span>
                    {numberWithCommas(p.price)}
                  </span>
                </h4>
                <hr />
                <p>{p.description}</p>
              </div>
            </Tooltip>
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default Home;
