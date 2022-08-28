import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { HomeNavbar } from "../../Components/Navbars/Navbars";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import "./Detail.css";
import {
  Card,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { Tooltip } from "@material-ui/core";

const Details = ({ user }) => {
  //  this logout function is from the parent App.js //

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nameUpdate, setNameUpdate] = useState(false);
  const [priceUpdate, setPriceUpdate] = useState(false);
  const [desUpdate, setDesUpdate] = useState(false);
  const [update, setupdate] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [product, setProduct] = useState([]);
  const [product1, setProduct1] = useState([]);
  const { id } = useParams();
  const Navigate = useNavigate();

  const onChange = (e) => {
    setupdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const getProductDetail = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/product-details/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      }
    );
    setProduct(res.data);
  };
  const getProductDetail1 = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/inv-details/${id}`, {
      headers: {
        Authorization: "Bearer " + token.access,
      },
    });
    setProduct1(res.data);
  };

  const onDelete = () => {
    Delete();
    handleClose();
  };
  const Delete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });
      Navigate("/product");
      toast("Product Deleted successfully", {
        position: "bottom-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-delete",
      });
    } catch {}
  };

  useEffect(() => {
    getProductDetail();
    getProductDetail1();
  }, []);

  const Update = async () => {
    const UpdatedProduct = {
      name: update.name,
      price: update.price,
      description: update.description,
    };
    if (update.name === "") {
      update.name = product.name;
    }
    if (update.price === "") {
      update.price = product.price;
    }
    if (update.description === "") {
      update.description = product.description;
    }

    console.log(UpdatedProduct);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/update-product/${id}`,
        UpdatedProduct,
        {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        }
      );
      getProductDetail();
      toast("Product Updated", {
        position: "top-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-success",
      });
      setNameUpdate(false);
      setPriceUpdate(false);
      setDesUpdate(false);
    } catch {}
  };

  const sales = product1?.map((d) => d.sold);
  const total_sales = sales.reduce((a, b) => a + b, 0);

  const purchase = product1?.map((d) => d.purchased);
  const total_purchased = purchase.reduce((a, b) => a + b, 0);

  let nameForm = "";
  let priceForm = "";
  let desForm = "";

  if (nameUpdate) {
    nameForm = (
      <form>
        <input
          name="name"
          value={update.name}
          onChange={onChange}
          type="text"
          className="balanceUpdate"
        />
        <Button variant="primary" onClick={Update}>
          Update
        </Button>
      </form>
    );
  } else {
    nameForm = null;
  }
  if (priceUpdate) {
    priceForm = (
      <form>
        <input
          name="price"
          value={update.price}
          onChange={onChange}
          type="number"
          className="balanceUpdate"
        />
        <Button variant="primary" onClick={Update}>
          Update
        </Button>
      </form>
    );
  } else {
    priceForm = null;
  }
  if (desUpdate) {
    desForm = (
      <form>
        <textarea
          name="description"
          rows="5"
          cols="70"
          value={update.description}
          onChange={onChange}
          className="balanceUpdate"
        ></textarea>
        <Button variant="primary" onClick={Update}>
          Update
        </Button>
      </form>
    );
  } else {
    desForm = null;
  }

  //  ============== This function Style the color of available ========== //
  const AvailableStyle = (x) => {
    if (x >= 10) return "lime";
    else {
      return "red";
    }
  };

  const formatDate = (string) => {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(string).toLocaleDateString([], options);
  };

  // =================================================================
  return (
    <div className="Details">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this Product and all entries
            associated to it ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                onDelete();
              }}
            >
              yes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              no
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <HomeNavbar />
      <div className="Detail-head">
        <Link to="/product" className="backLink">
          <FaArrowLeft />
          back to Products
        </Link>
        <Link to="/" className="backLink">
          <AiFillHome />
          back to Home
        </Link>

        <div className="operations">
          <Tooltip
            title="Delete this product and all inventory entries associated to it"
            placement="top-start"
          >
            <button className="delete" onClick={handleShow}>
              <AiFillDelete size={40} style={{ color: "white" }} />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="client-body">
        <Card>
          <Card.Header
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
              textTransform: "uppercase",
              color: "blue",
            }}
          >
            {product.name}
            <small
              onClick={() => setNameUpdate(!nameUpdate)}
              style={{ cursor: "pointer" }}
            >
              {" "}
              <FaPen size={25} />
            </small>
            {nameForm}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8} sm={6}>
                <Card.Title style={{ fontSize: "1.9rem", color: "blue" }}>
                  Product ID: <span>{product.id}</span>
                </Card.Title>
              </Col>
              <Col md={4} sm={6}>
                <Card.Title style={{ color: "blue" }}>
                  Product Price: <span>&#8358;{product.price}</span>{" "}
                  <small
                    onClick={() => setPriceUpdate(!priceUpdate)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <FaPen />
                  </small>
                  {priceForm}
                </Card.Title>
              </Col>
            </Row>
            <hr />
            <ListGroup variant="flush">
              <ListGroup.Item style={{ color: "blue" }}>
                <strong>Descriptions</strong> <p>{product.description}</p>
                <small
                  onClick={() => setDesUpdate(!desUpdate)}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <FaPen />
                </small>
                {desForm}
              </ListGroup.Item>
            </ListGroup>
            <hr />
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="more-info">
                  <div>Total purchase:{total_purchased}</div>
                  <div>Total Sales:{total_sales}</div>
                  <div>
                    Available:{" "}
                    <span
                      style={{
                        color: AvailableStyle(total_purchased - total_sales),
                      }}
                    >
                      {total_purchased - total_sales}
                    </span>{" "}
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <div style={{ margin: "1rem 0" }}>
          <p className="All-entry">all Inventory entries for {product.name}</p>
        </div>
        {product1.length !== 0 ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th style={{ color: "blue" }}>Inventory id</th>
                <th style={{ color: "blue" }}>SOLD</th>
                <th style={{ color: "blue" }}>PURCHASED</th>
                <th style={{ color: "blue" }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {product1?.map((p) => (
                <tr key={p.id}>
                  <td style={{ color: "white" }}>{p.id}</td>
                  <td>{p.sold}</td>
                  <td>{p.purchased}</td>
                  <td>{formatDate(p.created)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="no-entry">
            <p>no entry for this product</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
