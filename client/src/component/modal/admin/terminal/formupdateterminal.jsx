import React from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../../../config/api";

export default function FormUpdateTerminal({ show, showModal, data }) {
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

  const handleSubmit = useMutation(async (id) => {
    try {
      const response = await API.patch("/terminal/" + id, form);
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
          <Form onSubmit={() => handleSubmit.mutate(data?.ID)}>
            <p className="fs-3">Update Terminal</p>
            <FloatingLabel
              controlId="floatingInput"
              label={data?.name}
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder={data?.name}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={data?.kota}>
              <Form.Control
                type="text"
                name="kota"
                onChange={handleChange}
                placeholder={data?.kota}
              />
            </FloatingLabel>
            <Button
              type="submit"
              className="my-3 w-100"
              style={{ background: "#e67e22", borderColor: "#e67e22" }}
            >
              Update Terminal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
