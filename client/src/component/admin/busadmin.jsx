import {
  faFileCsv,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import BusCSV from "../modal/admin/bus/buscsv";
import FormBus from "../modal/admin/bus/formbus";
import FormUpdateBus from "../modal/admin/bus/formupdatebus";

export default function BusAdmin() {
  const [showModal, setModal] = useState(false);
  const [showCSV, setShowCSV] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dataBus, setDataBus] = useState();

  const { data: buss, refetch } = useQuery("busAdmin", async () => {
    const response = await API.get("/buss");
    return response.data.data;
  });

  const HandleDel = useMutation(async (id) => {
    try {
      const response = await API.delete("/bus/" + id);
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  const HandleEdit = useMutation(async (id) => {
    try {
      const response = await API.get("/bus/" + id);
      setDataBus(response.data.data);
      setShowUpdate(true);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Container className="mt-5">
        <Row>
          <p className="display-5">Data Bus Travel</p>
          <Col>
            <Table className="mt-4" striped responsive size="sm">
              <thead style={{ background: "#0758c3", color: "white" }}>
                <tr>
                  <th>No</th>
                  <th>Nama Bus</th>
                  <th>Tipe Kelas</th>
                  <th>
                    <Button
                      onClick={() => setModal(true)}
                      style={{
                        background: "#e67e22",
                        height: "40px",
                        border: "1px solid #e67e22",
                        float: "right",
                      }}
                    >
                      Add Bus
                    </Button>
                    <Button
                      className="mx-1"
                      onClick={() => setShowCSV(true)}
                      style={{
                        background: "#48BB78",
                        height: "40px",
                        border: "1px solid #48BB78",
                        float: "right",
                      }}
                    >
                      <FontAwesomeIcon icon={faFileCsv} className="me-2" />
                      Import CSV
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {buss?.map((element, number) => {
                  number += 1;
                  return (
                    <tr>
                      <td>{number}</td>
                      <td>{element.name}</td>
                      <td>{element.kelas}</td>
                      <td>
                        <Button
                          onClick={() => HandleEdit.mutate(element.ID)}
                          className="btn text-success mx-2 float-end"
                          style={{ background: "none", border: "none" }}
                        >
                          <FontAwesomeIcon icon={faPenSquare} />
                        </Button>
                        <Button
                          onClick={() => HandleDel.mutate(element.ID)}
                          className="btn text-danger float-end"
                          style={{ background: "none", border: "none" }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <BusCSV show={showCSV} showModal={setShowCSV} />
      <FormBus show={showModal} showModal={setModal} />
      <FormUpdateBus
        show={showUpdate}
        showModal={setShowUpdate}
        data={dataBus}
      />
    </>
  );
}
