import { HomeNavbar } from "../../Components/Navbars/Navbars";
import Sidebar from "../../Components/SIdebar/Sidebar";
import Client from "../../Components/Client/Client";
import "./product.css";

const Product = () => {
  return (
    <div className="Products">
      <HomeNavbar />
      <div className="product-container">
        <Client />
        <Sidebar />
      </div>
    </div>
  );
};

export default Product;
