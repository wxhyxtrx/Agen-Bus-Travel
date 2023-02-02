import React from "react";
import { useState, useContext } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import Badge from "react-bootstrap/Badge";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();
  function handleLogout() {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  }

  let { data: notif } = useQuery("notifTiket", async () => {
    const response = await API.get("/transpending");
    return response.data.data;
  });

  return (
    <>
      <Navbar style={{ background: "#eef5ff" }}>
        <Navbar.Brand href="/" className="ms-3 align-items-center d-flex">
          <label className="fw-normal fs-2">
            <b style={{ color: "#0758c3" }}>BUS</b>TRAVEL
          </label>
        </Navbar.Brand>
        <Container className=" align-items-center">
          <Navbar.Collapse className="justify-content-end">
            {state.isLogin !== true ? (
              <>
                <Navbar.Text>
                  <Button
                    className="mx-1 border-0"
                    style={{
                      background: "#E67E22",
                      border: "1px solid #E67E22",
                    }}
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </Button>
                  <Button
                    className="mx-2 border-0"
                    style={{ background: "#0758c3" }}
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                </Navbar.Text>
              </>
            ) : state.user.role === "user" ? (
              <>
                <Dropdown align="end" className="me-3">
                  <label className="fw-semibold fs-5">
                    {state.user.fullname}
                  </label>
                  <DropdownToggle
                    className=""
                    style={{ border: "0px solid white", background: "none" }}
                  >
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      className="img-tumbnail rounded-circle"
                      style={{ width: "40px" }}
                    />
                  </DropdownToggle>
                  <Dropdown.Menu variant="light" className="border-0 shadow-lg">
                    <Dropdown.Item href="/tiket" style={{ color: "#0078b5" }}>
                      Tiket{" "}
                      {notif?.length !== 0 ? (
                        <Badge
                          bg="danger"
                          className="rounded-circle text-center"
                        >
                          {notif?.length}
                        </Badge>
                      ) : null}
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ color: "#0078b5" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : state.user.role === "admin" ? (
              <>
                <Dropdown align="end" className="me-3">
                  <label className="fw-semibold fs-5">
                    {state.user.fullname}
                  </label>
                  <DropdownToggle
                    style={{ border: "0px solid white", background: "none" }}
                  >
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      className="img-tumbnail rounded-circle"
                      style={{ width: "40px" }}
                    />
                  </DropdownToggle>
                  <Dropdown.Menu variant="light" className="border-0 shadow-lg">
                    <Dropdown.Item href="/" style={{ color: "#0078b5" }}>
                      Dasboard
                    </Dropdown.Item>
                    <Dropdown.Item href="/tikets" style={{ color: "#0078b5" }}>
                      Tiket
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/terminal"
                      style={{
                        color: "#0078b5",
                      }}
                    >
                      Terminal
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/bus"
                      style={{
                        borderBottom: "2px solid #0078b5",
                        color: "#0078b5",
                      }}
                    >
                      Bus
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ color: "#0078b5" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        show={showLogin}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
    </>
  );
}
