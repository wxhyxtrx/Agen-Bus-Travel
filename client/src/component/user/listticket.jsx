import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Success from "../modal/user/success";
import Moment from "react-moment";
import moment from "moment";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";

export default function Listticket({ tikets, result, form }) {
  const [state] = useContext(UserContext);
  const [showModal, setModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleBuy = async (id) => {
    let count = parseInt(form.qty);
    count === 0 ? (count = 1) : (count = parseInt(form.qty));
    const request = {
      qty: count,
    };
    if (state.isLogin) {
      await API.post("/tiket-transaction/" + id, request);
      setModal(true);
    } else {
      setShowLogin(true);
    }
  };
  return (
    <>
      <Container className="mb-5">
        {/* Header content */}
        <Card className="px-3 mb-4 border-0" style={{ background: "none" }}>
          <Row>
            <Col className="text-center">Jadwal</Col>
            <Col className="text-center">Nama Bus</Col>
            <Col sm={2} className="text-center">
              Waktu Berangkat
            </Col>
            <Col></Col>
            <Col sm={2}>Waktu Tiba</Col>
            <Col>Dusari</Col>
            <Col sm={2}>Harga/pax</Col>
            <Col>Stock</Col>
          </Row>
        </Card>
        {/* content */}
        {!!result ? (
          result?.length > 0 ? (
            result?.map((element) => {
              let start = moment(element.waktu_berangkat);
              let end = moment(element.waktu_tiba);
              let diff = end.diff(start);
              return (
                <>
                  {element.stock > 0 ? (
                    <Card
                      className="p-3 lh-1 mb-2 w-100 border-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBuy(element.id)}
                    >
                      <Row>
                        <Col>
                          <Card.Title>
                            <Moment format="DD MMM YYYY">
                              {element.jadwal}
                            </Moment>
                          </Card.Title>
                        </Col>
                        <Col className="text-center">
                          <Card.Title>{element.bus.name}</Card.Title>
                          <Card.Text
                            className="text-secondary"
                            style={{ fontSize: "10pt" }}
                          >
                            {element.bus.kelas}
                          </Card.Text>
                        </Col>
                        <Col sm={2} className="text-center">
                          <Card.Title>
                            <Moment format="HH:mm">
                              {element.waktu_berangkat}
                            </Moment>
                          </Card.Title>
                          <Card.Text
                            className="text-secondary"
                            style={{ fontSize: "10pt" }}
                          >
                            {element.terminalasal.name}
                          </Card.Text>
                        </Col>
                        <Col className="d-flex align-items-center text-center">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ right: 0, top: 20 }}
                          />
                        </Col>
                        <Col sm={2}>
                          <Card.Title>
                            <Moment format="HH:mm">{element.waktu_tiba}</Moment>
                          </Card.Title>
                          <Card.Text
                            className="text-secondary"
                            style={{ fontSize: "10pt" }}
                          >
                            {element.terminaltujuan.name}
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Title>
                            {moment.duration(diff).format("hh " + "J" + " mm ")}
                          </Card.Title>
                        </Col>
                        <Col sm={2}>
                          <Card.Title style={{ color: "#0078b5" }}>
                            Rp. {element.harga}
                          </Card.Title>
                        </Col>
                        <Col>{element.stock} Tiket</Col>
                      </Row>
                    </Card>
                  ) : (
                    <Card
                      className="p-3 lh-1 mb-2 w-100 text-secondary border-0"
                      style={{ background: "#dee2e6" }}
                    >
                      <Row>
                        <Col>
                          <Card.Title>
                            <Moment format="DD MMM YYYY">
                              {element.jadwal}
                            </Moment>
                          </Card.Title>
                        </Col>
                        <Col className="text-center">
                          <Card.Title>{element.bus.name}</Card.Title>
                          <Card.Text
                            className="text-secondary"
                            style={{ fontSize: "10pt" }}
                          >
                            {element.bus.kelas}
                          </Card.Text>
                        </Col>
                        <Col sm={2} className="text-center">
                          <Card.Title>
                            <Moment format="HH:mm">
                              {element.waktu_berangkat}
                            </Moment>
                          </Card.Title>
                          <Card.Text
                            className="text-secondary"
                            style={{ fontSize: "10pt" }}
                          >
                            {element.terminalasal.name}
                          </Card.Text>
                        </Col>
                        <Col className="d-flex align-items-center text-center">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ right: 0, top: 20 }}
                          />
                        </Col>
                        <Col sm={2}>
                          <Card.Title>
                            <Moment format="HH:mm">{element.waktu_tiba}</Moment>
                          </Card.Title>
                          <Card.Text
                            className="text-secondary"
                            style={{ fontSize: "10pt" }}
                          >
                            {element.terminaltujuan.name}
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Title>
                            {moment.duration(diff).format("hh " + "J" + " mm ")}{" "}
                            m
                          </Card.Title>
                        </Col>
                        <Col sm={2}>
                          <Card.Title style={{ color: "#0078b5" }}>
                            Rp. {element.harga}
                          </Card.Title>
                        </Col>
                        <Col>
                          <Card.Title style={{ color: "#0078b5" }}>
                            {element.stock > 0 ? (
                              element.stock
                            ) : (
                              <span className="text-danger">Tiket Habis</span>
                            )}
                          </Card.Title>
                        </Col>
                      </Row>
                    </Card>
                  )}
                </>
              );
            })
          ) : (
            <>
              <Card className="p-4 lh-1 mb-2 w-100 text-center">
                <Card.Subtitle
                  style={{
                    color: "#e67e22",
                    fontWeight: "normal",
                    lineHeight: 1.5,
                  }}
                >
                  Mohon maaf tiket tidak tersedia, silakan merubah rute
                  perjalanan anda
                  <br /> <b>Terimakasih</b>
                </Card.Subtitle>
              </Card>
            </>
          )
        ) : (
          tikets?.map((element) => {
            let start = moment(element.waktu_berangkat);
            let end = moment(element.waktu_tiba);
            let diff = end.diff(start);
            return (
              <>
                {element.stock > 0 ? (
                  <Card
                    className="p-3 lh-1 mb-2 w-100 border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBuy(element.id)}
                  >
                    <Row>
                      <Col>
                        <Card.Title>
                          <Moment format="DD MMM YYYY">{element.jadwal}</Moment>
                        </Card.Title>
                      </Col>
                      <Col className="text-center">
                        <Card.Title>{element.bus.name}</Card.Title>
                        <Card.Text
                          className="text-secondary"
                          style={{ fontSize: "10pt" }}
                        >
                          {element.bus.kelas}
                        </Card.Text>
                      </Col>
                      <Col sm={2} className="text-center">
                        <Card.Title>
                          <Moment format="HH:mm">
                            {element.waktu_berangkat}
                          </Moment>
                        </Card.Title>
                        <Card.Text
                          className="text-secondary"
                          style={{ fontSize: "10pt" }}
                        >
                          {element.terminalasal.name}
                        </Card.Text>
                      </Col>
                      <Col className="d-flex align-items-center text-center">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ right: 0, top: 20 }}
                        />
                      </Col>
                      <Col sm={2}>
                        <Card.Title>
                          <Moment format="HH:mm">{element.waktu_tiba}</Moment>
                        </Card.Title>
                        <Card.Text
                          className="text-secondary"
                          style={{ fontSize: "10pt" }}
                        >
                          {element.terminaltujuan.name}
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Title>
                          {moment.duration(diff).format("hh " + "J" + " mm ")} m
                        </Card.Title>
                      </Col>
                      <Col sm={2}>
                        <Card.Title style={{ color: "#0078b5" }}>
                          Rp. {element.harga}
                        </Card.Title>
                      </Col>
                      <Col>
                        <Card.Title>{element.stock} Tiket</Card.Title>
                      </Col>
                    </Row>
                  </Card>
                ) : (
                  <Card
                    className="p-3 lh-1 mb-2 w-100 text-secondary border-0"
                    style={{ background: "#dee2e6" }}
                  >
                    <Row>
                      <Col>
                        <Card.Title>
                          <Moment format="DD MMM YYYY">{element.jadwal}</Moment>
                        </Card.Title>
                      </Col>
                      <Col className="text-center">
                        <Card.Title>{element.bus.name}</Card.Title>
                        <Card.Text
                          className="text-secondary"
                          style={{ fontSize: "10pt" }}
                        >
                          {element.bus.kelas}
                        </Card.Text>
                      </Col>
                      <Col sm={2} className="text-center">
                        <Card.Title>
                          <Moment format="HH:mm">
                            {element.waktu_berangkat}
                          </Moment>
                        </Card.Title>
                        <Card.Text
                          className="text-secondary"
                          style={{ fontSize: "10pt" }}
                        >
                          {element.terminalasal.name}
                        </Card.Text>
                      </Col>
                      <Col className="d-flex align-items-center text-center">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ right: 0, top: 20 }}
                        />
                      </Col>
                      <Col sm={2}>
                        <Card.Title>
                          <Moment format="HH:mm">{element.waktu_tiba}</Moment>
                        </Card.Title>
                        <Card.Text
                          className="text-secondary"
                          style={{ fontSize: "10pt" }}
                        >
                          {element.terminaltujuan.name}
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Title>
                          {moment.duration(diff).format("hh " + "J" + " mm ")} m
                        </Card.Title>
                      </Col>
                      <Col sm={2}>
                        <Card.Title style={{ color: "#0078b5" }}>
                          Rp. {element.harga}
                        </Card.Title>
                      </Col>
                      <Col>
                        <Card.Title style={{ color: "#0078b5" }}>
                          {element.stock > 0 ? (
                            element.stock
                          ) : (
                            <span className="text-danger">Tiket Habis</span>
                          )}
                        </Card.Title>
                      </Col>
                    </Row>
                  </Card>
                )}
              </>
            );
          })
        )}
      </Container>
      <Success show={showModal} showModal={setModal} />
      <Login
        show={showLogin}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
    </>
  );
}
