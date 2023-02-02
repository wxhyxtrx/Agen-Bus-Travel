import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AddTiket from "./component/admin/addtiket";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import Bus from "./pages/admin/bus";
import Terminal from "./pages/admin/terminal";
import Tiket from "./pages/admin/tiket";
import Home from "./pages/home";
import Tikets from "./pages/user/tikets";
import Transaction from "./pages/user/transaction";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false && !isLoading) {
      console.log("-");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkauth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      {isLoading ? null : (
        <>
          <Router>
            <Routes>
              {state.user.role === "user" ? (
                <>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/tiket" element={<Tikets />}></Route>
                  <Route path="/invoice/:id" element={<Transaction />}></Route>
                </>
              ) : state.user.role === "admin" ? (
                <>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/tikets" element={<Tiket />}></Route>
                  <Route path="/formtiket" element={<AddTiket />}></Route>
                  <Route path="/terminal" element={<Terminal />}></Route>
                  <Route path="/bus" element={<Bus />}></Route>
                </>
              ) : (
                <Route path="/" element={<Home />}></Route>
              )}
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
