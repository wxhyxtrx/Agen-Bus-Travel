import React from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalTitle,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function Register({ show, showLogin, showRegister }) {
  const handleClose = () => showRegister(false);
  const changeModal = () => {
    handleClose();
    showLogin(true);
  };

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const { fullname, username, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegis = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const requestBody = JSON.stringify(form);
      const response = await API.post("/register", requestBody, config);

      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success Registered
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullname: "",
          username: "",
          email: "",
          password: "",
          role: "user",
        });
      } else {
        const alert = (
          <Alert variant="warning" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Email is Already!
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Body className="p-5">
          <ModalTitle style={{ color: "#0758c3" }}>Hello Traveler</ModalTitle>
          <label className="text-secondary">
            Silakan melakukan Register terlebih dahulu
          </label>
          {message && message}
          <Form
            onSubmit={(e) => handleRegis.mutate(e)}
            className="mt-2 text-center"
          >
            <FormControl
              type="text"
              name="fullname"
              placeholder=" Full name"
              className="my-3"
              onChange={handleChange}
              value={fullname}
            />
            <Form.Control
              type="text"
              placeholder="Username"
              className="mb-3"
              name="username"
              onChange={handleChange}
              value={username}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-3"
              name="email"
              onChange={handleChange}
              value={email}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              className="mb-3"
              name="password"
              onChange={handleChange}
              value={password}
            />
            <Button
              type="submit"
              className="mt-3 w-100"
              style={{ background: "#0758c3", border: "1px solid #0758c3" }}
            >
              Register
            </Button>
            <Form.Label className="mt-3">
              Sudah punya akun?
              <b
                variant="link"
                onClick={changeModal}
                style={{
                  cursor: "pointer",
                  marginLeft: "5px",
                  color: "#FF9800",
                }}
              >
                Login
              </b>
            </Form.Label>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
