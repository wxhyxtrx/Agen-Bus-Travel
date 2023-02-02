import React from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalTitle,
  Alert,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";

export default function Login({ show, showLogin, showRegister }) {
  const handleClose = () => showLogin(false);
  const changeModal = () => {
    handleClose();
    showRegister(true);
  };

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/login", form);
      const alert = (
        <Alert variant="success" className="py-1">
          Success
        </Alert>
      );
      setMessage(alert);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      handleClose();
      console.log("data berhasil ditambahkan", response.data.data);
    } catch (err) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Wrong Email or Password !
        </Alert>
      );
      setMessage(alert);
      console.log(err);
      console.log(state);
    }
  });
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Body className="p-5">
          <ModalTitle style={{ color: "#0758c3" }}>Hello Traveler</ModalTitle>
          <label className="text-secondary">
            Silakan login terlebih dahulu
          </label>
          {message && message}
          <Form
            onSubmit={(e) => handleSubmit.mutate(e)}
            className="mt-2 text-center"
          >
            <FormControl
              type="email"
              name="email"
              placeholder=" Email"
              className="mt-3"
              onChange={handleChange}
            />
            <FormControl
              type="password"
              name="password"
              placeholder="Password"
              className="mt-2"
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="mt-3 w-100"
              style={{ background: "#0758c3", border: "1px solid #0758c3" }}
            >
              Login
            </Button>
            <Form.Label className="mt-3">
              Anda belum memiliki Akun?
              <b
                variant="link"
                onClick={changeModal}
                style={{
                  cursor: "pointer",
                  marginLeft: "5px",
                  color: "#FF9800",
                }}
              >
                Register
              </b>
            </Form.Label>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
