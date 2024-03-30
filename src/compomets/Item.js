import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_FAV, TOGGLE_ITEM } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

function Item({ id, name, image, desc, price }) {
  const dispatch = useDispatch();
  const { cart, favs } = useSelector((state) => state);
  const navigator = useNavigate();

  console.log("image", image);

  return (
    <Card className="item-card">
      <CardHeader title={name} subheader="September 14, 2016" />
      <CardMedia
        className="item-media"
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="h5" color="text.primary">
          {price + "$"}
        </Typography>
      </CardContent>

      <CardActions className="item-actions">
        <IconButton
          sx={{ color: favs.includes(id) ? "red" : "grey" }}
          onClick={() => {
            if (localStorage.getItem("name")) {
              dispatch({ type: TOGGLE_FAV, id });
            } else {
              navigator("/labtopi/login");
            }
          }}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          sx={{ color: cart.find((item) => item.id === id) ? "red" : "grey" }}
          onClick={() => {
            if (localStorage.getItem("name")) {
              dispatch({ type: TOGGLE_ITEM, id, amount: 1 });
            } else {
              navigator("/labtopi/login");
            }
          }}
          aria-label="Add to cart"
        >
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Item;
