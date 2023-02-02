import React from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../../../config/api";

export default function FormTerminal({ show, showModal }) {
  const handleClose = () => showModal(false);
  const [form, setForm] = React.useState({
    name: "",
    kota: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      const response = await API.post("/terminal", form);
      console.log("Input Tiket=>", response);
      if (response.data.code === 200) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <p className="fs-3">Input Terminal</p>
            <FloatingLabel
              controlId="floatingInput"
              label="Terminal name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Terminal name ..."
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Terminal city">
              <Form.Control
                type="text"
                name="kota"
                onChange={handleChange}
                placeholder="Terminal city"
              />
            </FloatingLabel>
            <Button
              type="submit"
              className="my-3 w-100"
              style={{ background: "#e67e22", borderColor: "#e67e22" }}
            >
              Add Terminal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
