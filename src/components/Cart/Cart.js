import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
// Icons
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// Context
import { GlobalContext } from "../../context/GlobalContext";

export default function Cart() {
  // Sub Total
  const [total, setTotal] = useState(null);
  // All Total
  const [totalReal, setTotalReal] = useState(null);
  // Total QTY
  const [totalQTY, setTotalQTY] = useState(null);
  // Tax Input
  const [taxNum, setTaxNum] = useState(null);
  // Discount Input
  const [discountNum, setDiscountNum] = useState(null);
  // Shipping Input
  const [shipping, setShippingNum] = useState(null);

  const { changeProductQty, cart, removeProductFromCart } =
    useContext(GlobalContext);

  useEffect(() => {
    setTotal(
      Number(
        cart
          .reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
          ?.toFixed(2)
      )
    );
    setTotalQTY(Number(cart.reduce((acc, curr) => acc + Number(curr.qty), 0)));
    setTotalReal(
      Number(
        (total + total * (taxNum / 100) - discountNum - shipping)?.toFixed(2)
      )
    );
  }, [cart, total, taxNum, discountNum, shipping]);
  // Reset Button
  // function reset() {
  //   localStorage.removeItem("cart");
  // }

  return (
    <div className="cart">
      {/* **** Table ***** */}
      <div className="main-table">
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>SUB TOTAL</th>
              {/* <th>DEL</th> */}
            </tr>
          </thead>
          <tbody>
            {!cart.length > 0 ? (
              <tr>
                <td colSpan="4" className="td-empty">
                  No Data Available
                </td>
              </tr>
            ) : (
              <>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="td-product-name">
                      <h4>{item.title}</h4>
                      <span>{item.code}</span>
                    </td>
                    <td className="counter">
                      <div className="flex">
                        <button
                          onClick={() => {
                            changeProductQty(item, item.qty - 1);
                          }}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => {
                            changeProductQty(item, item.qty + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.price * item.qty}</td>
                    <td className="del-icon">
                      <button onClick={() => removeProductFromCart(item.id)}>
                        <MdDeleteForever />
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* ******* Calculation ******** */}
      <div className="calculation">
        <div className="calculation-container">
          <div className="calc-left">
            <div className="input-div">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Tax"
                onChange={(e) => setTaxNum(e.target.value)}
              />
              <span>%</span>
            </div>
            <div className="input-div">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Discount"
                onChange={(e) => setDiscountNum(e.target.value)}
              />
              <span>$</span>
            </div>
            <div className="input-div">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Shipping"
                onChange={(e) => setShippingNum(e.target.value)}
              />
              <span>$</span>
            </div>
          </div>
          <div className="calc-right">
            <h4>Total QTY : {totalQTY}</h4>
            <h4>Sub Total : $ {total}</h4>
            <h2>Total : $ {totalReal}</h2>
          </div>
        </div>
      </div>

      {/* ******* two-btns-div ******** */}

      <div className="two-btns-div">
        <button className="btn-red">Reset</button>
        <button className="btn-success">
          Pay Now{" "}
          <span className="money-icon">
            {" "}
            <FaMoneyBillAlt />{" "}
          </span>
        </button>
      </div>
    </div>
  );
}
