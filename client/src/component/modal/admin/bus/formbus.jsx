import React from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../../../config/api";

export default function FormBus({ show, showModal }) {
  const handleClose = () => showModal(false);
  const [form, setForm] = React.useState({
    name: "",
    kelas: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async () => {
    try {
      const response = await API.post("/bus", form);
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
          <Form onSubmit={() => handleSubmit.mutate()}>
            <p className="fs-3">Input Bus</p>
            <FloatingLabel
              controlId="floatingInput"
              label="Bus name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Bus name ..."
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Bus Class">
              <Form.Control
                type="text"
                name="kelas"
                onChange={handleChange}
                placeholder="Bus city"
              />
            </FloatingLabel>
            <Button
              type="submit"
              className="my-3 w-100"
              style={{ background: "#e67e22", borderColor: "#e67e22" }}
            >
              Add Bus
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
