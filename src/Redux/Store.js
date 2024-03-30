import { createStore, applyMiddleware } from "redux";
import reducers from "./Reducers/index.js";

const Store = createStore(reducers);

export default Store;
