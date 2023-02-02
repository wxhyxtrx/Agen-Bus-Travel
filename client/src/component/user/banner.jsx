import React from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { faBusAlt, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Listticket from "./listticket";

export default function Banner() {
  const [result, setResult] = useState();

  const [form, setForm] = useState({
    asal: "",
    tujuan: "",
    jadwal: "",
    qty: 0,
  });
  const { qty } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.type === "date") {
      let newDate = new Date(e.target.value).format("yyyy-dd-mm");
      setForm({ jadwal: newDate });
    }
  };

  let { data: tikets } = useQuery("tikets", async () => {
    const response = await API.get("/tikets");
    return response.data.data;
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const request = form;
    const respone = await API.post("/search-tiket", request);
    setResult(respone.data.data);
  };

  const { data: terminal } = useQuery("terminalAdmin", async () => {
    const response = await API.get("/terminals");
    return response.data.data;
  });

  return (
    <>
      <div
        className=" fuild py-5 position-relative "
        style={{ height: "450px", background: "#0758c3" }}
      >
        <Card
          className="border-0 text-start ps-5 mt-5"
          style={{ background: "none" }}
        >
          <p className="fs-2 text-light col-md-5">
            Mulailah Perjalanan Anda Hari Ini Bersama{" "}
            <span className="fw-bold" style={{ color: "#e67e22" }}>
              BUSTRAVEL
            </span>
          </p>
          <p className="fs-5 text-light fw-light col-md-4">
            Memori dan cerita perjalanan anda adalah prioritas utama bagi kami.
          </p>
        </Card>
        <Carousel
          fade
          className="position-absolute w-50"
          style={{
            top: 70,
            right: 75,
          }}
        >
          <Carousel.Item>
            <Image
              className="img-fuild w-100 rounded"
              src="https://omnispace.blob.core.windows.net/image-promo/%5BBANNER%20DALAM%5D%20TRAC%20BUS%20MUDIK%203JT%20(1283%20x%20475%20px).jpg"
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="img-fuild w-100 rounded"
              src="https://www.ryobi-holdings.jp/bus/master/wp-content/uploads/2018/03/180305%E8%B2%B8%E5%88%87%E3%83%90%E3%82%B9_banner_englishtop.png"
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="img-fuild w-100 rounded"
              src="https://www.korea.net/upload/content/editImage/travel_bus_seoul_eykim86_text.png"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <Container style={{ zIndex: 1, marginTop: -70, marginBottom: 50 }}>
        <Card className="border-0 shadow-sm pe-2">
          <Row>
            <Col>
              <ListGroup
                variant="flush"
                style={{
                  height: "200px",
                  background: "#F2F2F2",
                  borderRadius: "10px 0px 0px 0px",
                }}
                className="text-start py-3 h-100"
              >
                <ListGroup.Item
                  style={{ borderLeft: "5px solid #E67E22", borderRadius: 0 }}
                  className="fw-semibold"
                >
                  <FontAwesomeIcon
                    icon={faBusAlt}
                    style={{ color: "#E67E22", fontSize: "20px" }}
                    className="me-3"
                  />
                  Tiket Bus
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Card className="border-0 py-2">
                <CardHeader style={{ background: "none", border: "0px" }}>
                  <Card.Title className="text-start fw-light fs-4">
                    <b>Tiket Bus</b>
                  </Card.Title>
                </CardHeader>
                <Card.Body>
                  <Form
                    onSubmit={(e) => handleSearch(e)}
                    className="text-start"
                  >
                    <Stack gap={3}>
                      <Row className="d-flex align-items-center">
                        <Col sm={5}>
                          <Form.Label className="fw-semibold">
                            Terminal Asal
                          </Form.Label>
                          <Form.Select name="asal" onChange={handleChange}>
                            <option>Pilih Terminal</option>
                            {terminal?.map((e) => (
                              <option value={e.name}>
                                {e.name} - {e.kota}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col sm={2} className="d-flex justify-content-center">
                          <Button
                            className="rounded-circle"
                            style={{
                              background: "#E67E22",
                              border: "1px solid #E67E22",
                              marginTop: "25px",
                            }}
                          >
                            <FontAwesomeIcon icon={faRepeat} />
                          </Button>
                        </Col>
                        <Col sm={5}>
                          <Form.Label className="fw-semibold">
                            Terminal Tujuan
                          </Form.Label>
                          <Form.Select name="tujuan" onChange={handleChange}>
                            <option>Pilih Terminal</option>
                            {terminal?.map((e) => (
                              <option value={e.name}>
                                {e.name} - {e.kota}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="d-flex align-items-center">
                        <Col>
                          <Form.Label className="fw-semibold">
                            Tanggal Berangkat
                          </Form.Label>
                          <FormControl
                            type="date"
                            name="jadwal"
                            onChange={handleChange}
                            required
                          />
                        </Col>

                        <Col>
                          <Form.Label className="fw-semibold">
                            Dewasa
                          </Form.Label>
                          <FormControl
                            type="number"
                            name="qty"
                            value={qty}
                            onChange={handleChange}
                            min={1}
                            placeholder="0"
                            id="qty"
                            required
                          />
                        </Col>
                        <Col>
                          <Button
                            type="submit"
                            style={{
                              background: "#E67E22",
                              border: "1px solid #E67E22",
                              marginTop: "30px",
                            }}
                          >
                            Cari Tiket
                          </Button>
                        </Col>
                      </Row>
                    </Stack>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
      <Listticket tikets={tikets} result={result} form={form} />
    </>
  );
}
