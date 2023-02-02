import React from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../../../config/api";

export default function TerminalCSV({ show, showModal }) {
  const handleClose = () => showModal(false);
  const [form, setForm] = React.useState({
    csv: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.files,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      const formData = new FormData();
      formData.set("csv", form?.csv[0], form?.csv[0]?.name);

      const response = await API.post("/csvterminal", formData);
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
            <p className="fs-3">Import CSV</p>
            <Form.Control type="file" name="csv" onChange={handleChange} />
            <Button
              type="submit"
              className="my-3 w-100"
              style={{ background: "#48BB78", borderColor: "#48BB78" }}
            >
              Import
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
