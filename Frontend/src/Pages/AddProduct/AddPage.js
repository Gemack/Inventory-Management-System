import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { HomeNavbar } from "../../Components/Navbars/Navbars";
import "./AddPage.css";

const AddPage = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const Navigate = useNavigate();

  const { name, price, description } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const onSubmit = async () => {
    const newProduct = { name, price, description };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/create-product",
        newProduct,
        {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        }
      );
      Navigate("/product");
      toast("New Product  Added", {
        position: "bottom-center",
        autoClose: 2000,
        type: "success",
        className: "toasty-success",
      });
    } catch (err) {
      toast("Something went wrong", {
        position: "bottom-center",
        autoClose: 2000,
        type: "error",
        className: "toasty-fail",
      });
    }
  };
  return (
    <>
      <HomeNavbar />

      <div className="AddPage">
        <Link to="/product" className="backLink" style={{ marginTop: "1rem" }}>
          {" "}
          <FaArrowLeft />
          Go back
        </Link>
        <h2>add new Product</h2>
        <form>
          <div className="addinput">
            <input
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Product Name"
              type="text"
              style={{ width: "80%" }}
            />
          </div>
          <div className="addinput">
            <input
              name="price"
              value={price}
              onChange={onChange}
              placeholder="Product price"
              type="number"
              inputProps={{ min: "0" }}
              style={{ width: "80%" }}
            />
          </div>
          <div className="addinput">
            <textarea
              rows="10"
              cols="30"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Product description"
              style={{ width: "80%" }}
            ></textarea>
          </div>
          <Button variant="primary" style={{ width: "70%" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPage;
