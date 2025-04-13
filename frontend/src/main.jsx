import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store/Store";
import { Provider } from "react-redux";
import axios from "axios";
import i18n from "./i18n.js";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
