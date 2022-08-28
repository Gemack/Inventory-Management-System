import { useState, useEffect } from "react";
import axios from "axios";
import "./Client.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Client = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const client = await axios.get(
        "http://127.0.0.1:8000/api/product-detail"
      );
      setData(client.data);
    } catch (err) {
      navigate("/");
      toast.error(
        "Access Token to this session as expired please refresh and login "
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Nicely format the Client Balance
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="Client">
      <Link to={"/"} className="links">
        <AiFillHome size={33} />
        Back Home
      </Link>
      <div className="client-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => (
              <tr key={dt.id}>
                <td
                  style={{
                    fontSize: "1.1rem",
                    color: "#000",
                    textTransform: "uppercase",
                  }}
                >
                  {dt.name}
                </td>
                <td style={{ fontSize: "1.7rem", color: "blue" }}>
                  <span>&#8358;</span>
                  {numberWithCommas(dt.price)}
                </td>
                <td>
                  <Link to={`/detail/${dt.id}`} className="detailLink">
                    {" "}
                    <BiDetail size={30} />
                    More Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Client;
