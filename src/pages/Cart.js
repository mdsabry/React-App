import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useRef, useState } from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import { CLEAR_CART } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { items, cart } = useSelector((state) => state);
  const [snack, setSnack] = useState(false);
  const dispatch1 = useDispatch();
  const navigate = useNavigate();

  const total = useRef();
  return (
    <>
      <div className="container px-3 my-5 clearfix">
        <div className="card">
          <div className="card-header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    <th
                      className="text-center py-3 px-4"
                      style={{ "min-width": 400 + "px" }}
                    >
                      Product Name &amp; Details
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ width: 100 + "px" }}
                    >
                      Price
                    </th>
                    <th
                      className="text-center py-3 px-4"
                      style={{ width: 120 + "px" }}
                    >
                      Quantity
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ width: 100 + "px" }}
                    >
                      Total
                    </th>
                    <th
                      className="text-center align-middle py-3 px-0"
                      style={{ width: 40 + "px" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <CartItem
                      id={item.id}
                      amount={item.amount}
                      onChange={(id, amount) => {
                        cart.find((item) => item.id == id).amount = amount;
                        total.current.innerText = calculateTotalPrice(
                          items,
                          cart
                        );
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="d-flex">
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">
                    Total price
                  </label>
                  <div ref={total} className="text-large">
                    <strong>{calculateTotalPrice(items, cart)}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-right">
              <button
                type="button"
                onClick={() => navigate("/labtopi")}
                className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
              >
                Back to shopping
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch1({
                    type: CLEAR_CART,
                  });
                  setSnack(true);
                }}
                className="btn btn-lg btn-primary mt-2"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <Snackbar
          open={snack}
          autoHideDuration={2000}
          onClose={() => {
            setSnack(false);
          }}
        >
          <SnackbarContent
            message={
              <span style={{ color: "white" }}>
                Payment completed Successfully
              </span>
            }
          />
        </Snackbar>
      </div>
    </>
  );
}
function calculateTotalPrice(items, cart) {
  var result = 0;
  cart.forEach((e) => {
    var item = items.find((item) => item.id == e.id);
    result = result + item.price * e.amount;
  });
  return result;
}
export default Cart;
