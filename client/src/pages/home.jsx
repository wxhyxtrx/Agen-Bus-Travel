import React, { useContext, useEffect } from "react";
import Dasboard from "../component/admin/dasboard";
import Banner from "../component/user/banner";
import Footer from "../component/footer";
import Header from "../component/header";
import { UserContext } from "../context/userContext";
import { setAuthToken } from "../config/api";

export default function Home() {
  const [state] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false) {
    }
  }, [state]);
  return (
    <>
      {state.isLogin !== true ? (
        <>
          <Header />
          <Banner />
          <Footer />
        </>
      ) : state.user.role === "user" ? (
        <>
          <Header />
          <Banner />
          <Footer />
        </>
      ) : state.user.role === "admin" ? (
        <>
          <Header />
          <Dasboard />
          <Footer />
        </>
      ) : null}
    </>
  );
}
