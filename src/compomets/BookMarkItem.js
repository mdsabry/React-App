import React from "react";
import { useSelector } from "react-redux";
import { RemoveCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { TOGGLE_FAV } from "../Redux/actions";

export default function BookMarkItem({ id }) {
  const { items } = useSelector((state) => state);
  const { image, name } = items.find((item) => item.id === id);
  const dispatch = useDispatch();

  return (
    <div className="BookMarkItem">
      <div className="BookMarkItemContent">
        <img src={image} className="d-block ui-w-40 ui-bordered mr-4" alt="" />
        <div className="media-body">{name}</div>
      </div>
      <RemoveCircle
        onClick={() => dispatch({ type: TOGGLE_FAV, id: id * 1 })}
      />
    </div>
  );
}
