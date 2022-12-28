import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/index";
import Product from "./routes/products";
import Category from "./routes/category";
import Order from "./routes/order";
import DetailOrder from "./routes/order/detail";
import Login from "./routes/auth/login";
import Forgot from "./routes/auth/forgot";
import { createContext, useCallback, useReducer, useEffect } from "react";
import AppReducer from "./reducer/AppReducer";
import axios from "axios";
import LayoutComponent from "./components/Layout/Layout";

export const AppContext = createContext();

function App() {
  const pathArray = window.location.pathname;
  const initialState = { user: null, products: [] };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const navigate = useNavigate();

  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("DucMinhToken");
      const option = {
        method: "GET",
        url: `https://webbantranh.herokuapp.com/api/getme?token=${token}`,
      };
      const response = await axios(option);
      console.log(response);
      if (response.data) {
        const { username, role } = response.data;
        dispatch({
          type: "CURRENT_USER",
          payload: { userName: username, isLogin: true, role },
        });
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      navigate("/auth/login");
    }
  }, [dispatch, navigate]);

  // useEffect(() => {
  //   checkCurrentUser();
  // }, [checkCurrentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {pathArray === "/auth/login" || pathArray === "/auth/forgot" ? (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot" element={<Forgot />} />
        </Routes>
      ) : (
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/category" element={<Category />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/detail" element={<DetailOrder />} />
          </Routes>
        </LayoutComponent>
      )}
    </AppContext.Provider>
  );
}

export default App;
