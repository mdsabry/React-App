import { RemoveCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { SET_AMOUNT, TOGGLE_ITEM } from "../Redux/actions";
import { useState } from "react";

export default function CartItem(props) {
  const items = useSelector((state) => state.items);
  const { name, image, price, desc } = items.find(
    (item) => item.id == props.id
  );
  const dispatch = useDispatch();
  const [inputAmount, setInputAmount] = useState(props.amount);

  return (
    <>
      <tr>
        <td className="p-4">
          <div className="media align-items-center">
            <img
              src={image}
              className="d-block ui-w-40 ui-bordered mr-4"
              alt=""
            />
            <div className="media-body">
              <a href="#" className="d-block text-dark">
                {name}
              </a>
              <small>
                <span className="text-muted">{desc}</span>
              </small>
            </div>
          </div>
        </td>
        <td className="text-right font-weight-semibold align-middle p-4">
          ${price}
        </td>
        <td class="align-middle p-4">
          <input
            type="text"
            value={inputAmount}
            class="form-control text-center"
            onChange={(e) => {
              setInputAmount(e.target.value);
              dispatch({
                type: SET_AMOUNT,
                id: props.id,
                amount: e.target.value,
              });
              props.onChange(props.id, e.target.value);
            }}
          />
        </td>
        <td class="text-right font-weight-semibold align-middle p-4">
          ${inputAmount * price}
        </td>
        <td class="text-center align-middle px-0">
          <RemoveCircle
            onClick={() => dispatch({ type: TOGGLE_ITEM, id: props.id * 1 })}
          />
        </td>
      </tr>
    </>
  );
}
