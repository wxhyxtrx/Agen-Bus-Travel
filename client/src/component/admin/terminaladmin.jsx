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
import FormTerminal from "../modal/admin/terminal/formterminal";
import FormUpdateTerminal from "../modal/admin/terminal/formupdateterminal";
import { useEffect } from "react";
import TerminalCSV from "../modal/admin/terminal/terminalcsv";

export default function TerminalAdmin() {
  const [showModal, setModal] = useState(false);
  const [showCSV, setShowCSV] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dataTerminal, setDataTerminal] = useState();

  const { data: terminal, refetch: refetchTerminal } = useQuery(
    "terminalAdmin",
    async () => {
      const response = await API.get("/terminals");
      return response.data.data;
    }
  );

  const HandleDel = useMutation(async (id) => {
    try {
      const response = await API.delete("/terminal/" + id);
      refetchTerminal();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  const HandleEdit = useMutation(async (id) => {
    try {
      const response = await API.get("/terminal/" + id);
      setDataTerminal(response.data.data);
      setShowUpdate(true);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    refetchTerminal();
  }, []);

  console.log(dataTerminal);
  return (
    <>
      <Container className="mt-5">
        <Row>
          <p className="display-5">Terminal Bus</p>
          <Col>
            <Table className="mt-4" striped responsive size="sm">
              <thead style={{ background: "#0758c3", color: "white" }}>
                <tr>
                  <th>No</th>
                  <th>Nama Terminal</th>
                  <th>Kota</th>
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
                      Add Terminal
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
                {terminal?.map((element, number) => {
                  number += 1;
                  return (
                    <tr>
                      <td>{number}</td>
                      <td>{element.name}</td>
                      <td>{element.kota}</td>
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
      <TerminalCSV show={showCSV} showModal={setShowCSV} />
      <FormTerminal show={showModal} showModal={setModal} />
      <FormUpdateTerminal
        show={showUpdate}
        showModal={setShowUpdate}
        data={dataTerminal}
      />
    </>
  );
}
