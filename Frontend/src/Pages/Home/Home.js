import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import { Container } from "react-bootstrap";
import { HomeNavbar } from "../../Components/Navbars/Navbars";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import Showcase from "../../Components/Showcase/Showcase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const Home = ({ auth }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    try {
      const product = await axios.get("http://localhost:8000/api/all");
      setData(product.data);
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const status = (x) => {
    if (x > 70) {
      return "Good";
    } else if (x <= 69 && x >= 40) {
      return "Fair";
    } else if (x <= 39 && x >= 0) {
      return "Bad";
    } else {
      return "Debt Danger";
    }
  };
  const statusStyle = (x) => {
    if (x > 70) {
      return "lime";
    } else if (x <= 69 && x >= 40) {
      return "yellow";
    } else if (x <= 39 && x >= 0) {
      return "red";
    } else {
      return "red";
    }
  };

  const [key, setKey] = useState("");

  const onChange = (e) => {
    setKey(e.target.value);
  };

  const submit = async () => {
    const file = { username: "Admin", key: key };
    try {
      await axios.post("http://localhost:8000/api/log", file);
      toast.success("Correct Password");
      setKey("");
      auth();
      handleClose();
      navigate("/create");
    } catch (error) {
      toast.error("Wrong Password");
    }
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
              To Manage Inventory you must be authenticated please provide
              password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
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
            <Button
              // onClick={handleClose}
              onClick={submit}
              color="primary"
            >
              Log in
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/*  */}
      <HomeNavbar />
      <Showcase data={data} />
      <Container className="home_md">
        <Tooltip
          title="Add and keep record of your inventories"
          placement="top-start"
        >
          <div className="manage" onClick={handleClickOpen}>
            <BsFillJournalBookmarkFill size={40} color="white" />
            <span>Manage Inventory</span>
          </div>
        </Tooltip>
      </Container>
      <hr style={{ color: "white" }} />

      <TableContainer className="home-table">
        <Table striped bordered hover variant="dark">
          <TableHead style={{ background: "blue" }}>
            <TableRow>
              <TableCell className="Table-head">Name of Product</TableCell>
              <TableCell className="Table-head">Purchased</TableCell>
              <TableCell className="Table-head">Sold</TableCell>
              <TableCell className="Table-head">Available</TableCell>
              <TableCell className="Table-head">Status</TableCell>
            </TableRow>
          </TableHead>
          {data?.map((d) => (
            <TableBody key={uuidv4()}>
              <TableRow>
                <TableCell className="Table-body">{d.name}</TableCell>
                <TableCell className="Table-body">{d.in}</TableCell>
                <TableCell className="Table-body">{d.out}</TableCell>
                <TableCell className="Table-body">{d.sum}</TableCell>
                <TableCell
                  className="Table-body"
                  style={{ background: statusStyle(d.sum) }}
                >
                  {status(d.sum)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
