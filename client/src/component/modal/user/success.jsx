import React from "react";
import { Modal } from "react-bootstrap";

export default function Success({ show, showModal }) {
  const handleClose = () => showModal(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Body>
          <label className="text-center">
            Tiket anda berhasil di tambahkan silakan segera melakukan pembayaran
            <b className="mx-2">
              <a
                href="/tiket"
                style={{
                  color: "#e67e22",
                  cursor: "pointer",
                  textDecoration: "none",
                }}>
                Klik disini
              </a>
            </b>
          </label>
        </Modal.Body>
      </Modal>
    </>
  );
}
