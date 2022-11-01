import React, { useEffect, useState } from "react";
// CSS File
import "./Pos.css";
// Icons
import { AiOutlineHome } from "react-icons/ai";
import { BsSearch, BsCalculator, BsBag } from "react-icons/bs";
import { BiExpand } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
// Components
import Card from "../components/Card/Card";
import Cart from "../components/Cart/Cart";
// Data
import { products } from "../utils/data";
import ModalUser from "../components/ModalUser/ModalUser";
// Filter Names
const CatsNames = ["Fruits", "Shoes", "Jackets"];

export default function Pos() {
  const [category, setCategory] = useState();
  const [activeFilter, setActiveFilter] = useState("All Categories");
  // Modal User
  const [modalUser, setModalUser] = useState(false);
  // Fetch Users
  const [users, setUsers] = useState([]);
  // Fetch warehouses
  const [warehouses, setWarehouses] = useState([]);
  // Product Id
  const [productsID, setProductsID] = useState(1);
  // Product
  const [productsFetch, setProductsFetch] = useState([]);

  // console.log("productsFetch", productsFetch?.products);
  // console.log("productsFetch only",productsFetch)
  // console.log("products",products)

  useEffect(() => {
    fetch(`http://localhost:8000/warehouses/${productsID}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProductsFetch(data);
        console.log("productsFetch",productsFetch)
      });
    setCategory(productsFetch?.products);
    // console.log("productsFetch", productsFetch?.products);
  }, [productsID]);
  useEffect(() => {
    // setCategory(productsFetch?.products);

    fetch("http://localhost:8000/users", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });

    fetch("http://localhost:8000/warehouses", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWarehouses(data);
        // console.log(item.warhousName)
      });
  }, []);


  const filterResult = (cartItem) => {
    const result = productsFetch?.products?.filter((curData) => {
      return curData.cat.includes(cartItem);
    });
    setCategory(result);
    setActiveFilter(cartItem);
  };

  return (
    <div className="pos">
      {modalUser && <ModalUser setModalUser={setModalUser} />}
      <div className="pos-left">
        {/* ******** Left Top ********* */}
        <div className="pos-left-top">
          {/* ****** User ***** */}
          <div className="user">
            <span className="home-icon">
              <HiOutlineUser />
            </span>
            <select>
              <>
                <option value="">Choose User</option>
                {users.map((user, index) => (
                  <React.Fragment key={index}>
                    <option
                      value={user.id}
                      // onClick={(e) => {
                      //   console.log("onClick", e.target.value);
                      // }}
                      // key={index}
                    >
                      {user.name}
                    </option>
                  </React.Fragment>
                ))}
              </>
            </select>
            <button className="user-icon" onClick={() => setModalUser(true)}>
              <FaUserPlus />
            </button>
          </div>
          {/* ****** Warehouse ***** */}
          <div className="warehouse">
            <span className="home-icon">
              <AiOutlineHome />
            </span>
            <select
              onChange={(e) => {
                console.log(e.target.value);
                setProductsID(e.target.value);
              }}
            >
              <>
                {/* <option value="">Choose User</option> */}
                {warehouses.map((warehouse, index) => (
                  <React.Fragment key={index}>
                    <option value={warehouse.id}>
                      {warehouse.warehousName}
                    </option>
                  </React.Fragment>
                ))}
              </>
            </select>
          </div>
        </div>
        <div className="pos-left-bottom">
          <Cart />
        </div>
      </div>
      <div className="pos-right">
        {/* ******** Right Top ********* */}
        <div className="pos-right-top">
          <div className="pos-right-top-search">
            <input placeholder="Scan/Search Product by Code Name" />
            <span>
              <BsSearch />
            </span>
          </div>
          <div className="pos-right-top-icons">
            <div>
              <span>
                {" "}
                <BsBag />
              </span>
            </div>
            <div>
              <span>
                {" "}
                <BiExpand />
              </span>
            </div>
            <div>
              <span>
                {" "}
                <BsCalculator />
              </span>
            </div>
            <div>
              <span>
                {" "}
                <AiOutlineHome />
              </span>
            </div>
          </div>
        </div>
        <div className="pos-right-bottom">
          <div className="filter-btns">
            <button
              className={`btn-blue ${
                activeFilter === "All Categories" ? "btn-blue-active" : ""
              }`}
              onClick={() => {
                setCategory(productsFetch?.products);
                setActiveFilter("All Categories");
              }}
            >
              All Categories
            </button>

            {CatsNames?.map((item, index) => (
              <button
                key={index}
                className={`btn-blue ${
                  activeFilter === `${item}` ? "btn-blue-active" : ""
                }`}
                onClick={() => filterResult(`${item}`)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="all-products">
            <div className="all-products-container">
              {category?.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
