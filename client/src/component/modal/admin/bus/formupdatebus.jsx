import React from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../../../config/api";

export default function FormUpdateBus({ show, showModal, data }) {
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

  const handleSubmit = useMutation(async (id) => {
    try {
      const response = await API.patch("/bus/" + id, form);
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
            <p className="fs-3">Update Bus Travel</p>
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
            <FloatingLabel controlId="floatingPassword" label={data?.kelas}>
              <Form.Control
                type="text"
                name="kelas"
                onChange={handleChange}
                placeholder={data?.kelas}
              />
            </FloatingLabel>
            <Button
              type="submit"
              className="my-3 w-100"
              style={{ background: "#e67e22", borderColor: "#e67e22" }}
            >
              Update Bus Travel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
