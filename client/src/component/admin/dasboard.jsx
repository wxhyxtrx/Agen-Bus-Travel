import {
  faCheck,
  faCity,
  faClock,
  faMoneyBill1Wave,
  faTicket,
  faBus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import React from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  NavLink,
  Row,
  Table,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dasboard() {
  const { data: tiket } = useQuery("tiketAdmin", async () => {
    const response = await API.get("/tikets");
    return response.data.data;
  });

  const { data: bus } = useQuery("busAdmin", async () => {
    const response = await API.get("/buss");
    return response.data.data;
  });

  const { data: terminal } = useQuery("terminalAdmin", async () => {
    const response = await API.get("/terminals");
    return response.data.data;
  });

  const { data: transaction, isLoading: loadingTransaction } = useQuery(
    "transAdmin",
    async () => {
      const response = await API.get("/transall");
      return response.data.data;
    }
  );
  let income = 0;

  let labelBulan = new Array();
  let dataGrafik = new Array();
  let labelGrafik = new Array();
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  transaction?.map((element, i) => {
    let indexBulan = new Date(element.datetrans).getMonth();
    if (element.status === "success") {
      income += element.total;

      if (!labelBulan.includes(indexBulan)) {
        labelBulan.push(indexBulan);
        dataGrafik[indexBulan] = 0;
      }
      dataGrafik[indexBulan] += element.qty;
    }
  });

  labelBulan?.map((e) => {
    labelGrafik[e] = namaBulan[e];
  });

  ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Data Penjualan Tiket setiap Bulan di tahun ${
          loadingTransaction
            ? "..."
            : moment(transaction[0]?.datetrans).format("yyyy")
        }`,
      },
    },
  };

  const dataBar = {
    labels: labelGrafik,
    datasets: [
      {
        label: "Transaction",
        data: dataGrafik,
        backgroundColor: "#0758c3",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  return (
    <>
      <Container className="my-5" style={{ minHeight: "100vh" }}>
        <Row>
          <Col>
            <Card className="border-0 shadow">
              <CardHeader
                className="border-0 text-white"
                style={{ background: "#0758c3" }}
              >
                Income
              </CardHeader>
              <Card.Text className="text-secondary p-3">
                <FontAwesomeIcon icon={faMoneyBill1Wave} className="fs-2 " />{" "}
                <span className="ms-2 fs-4">Rp. {income}</span>
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <NavLink href="/tikets">
              <Card className="border-0 shadow">
                <CardHeader
                  className="border-0 text-white"
                  style={{ background: "#0758c3" }}
                >
                  Ticket
                </CardHeader>
                <Card.Text className="text-secondary p-3">
                  <FontAwesomeIcon icon={faTicket} className="fs-2 " />{" "}
                  <span className="ms-2 fs-4">{tiket?.length} Ticket</span>
                </Card.Text>
              </Card>
            </NavLink>
          </Col>
          <Col>
            <NavLink href="/bus">
              <Card className="border-0 shadow">
                <CardHeader
                  className="border-0 text-white"
                  style={{ background: "#0758c3" }}
                >
                  Bus
                </CardHeader>
                <Card.Text className="text-secondary p-3">
                  <FontAwesomeIcon icon={faBus} className="fs-2 " />{" "}
                  <span className="ms-2 fs-4">{bus?.length} Bus</span>
                </Card.Text>
              </Card>
            </NavLink>
          </Col>
          <Col>
            <NavLink href="/terminal">
              <Card className="border-0 shadow">
                <CardHeader
                  className="border-0 text-white"
                  style={{ background: "#0758c3" }}
                >
                  Terminal
                </CardHeader>
                <Card.Text className="text-secondary p-3">
                  <FontAwesomeIcon icon={faCity} className="fs-2 " />{" "}
                  <span className="ms-2 fs-4">{terminal?.length} Terminal</span>
                </Card.Text>
              </Card>
            </NavLink>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="fs-3 my-3">List Transaction</p>
            <Table striped hover responsive size="sm">
              <thead style={{ background: "#e67e22", color: "white" }}>
                <tr>
                  <th>No Invoice</th>
                  <th>Pemesan</th>
                  <th>Tiket</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Date Transaction</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((element, i) => {
                  return (
                    <>
                      <tr>
                        <td>{element?.id}</td>
                        <td>{element?.user.fullname}</td>
                        <td>
                          {element.tiket.terminalasal.kota} -{" "}
                          {element.tiket.terminaltujuan.kota}
                        </td>
                        <td>
                          <span className="text-center">{element.qty}</span>
                        </td>
                        <td>{element.total}</td>
                        <td>
                          {moment(element.datetrans).format("DD MMM YYYY")}
                        </td>

                        <td>
                          {element.status === "pending" ? (
                            <Badge className="bg-warning rounded-circle">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="text-black"
                                style={{
                                  width: "15px",
                                  height: "20px",
                                  fontSize: "10px",
                                }}
                              />
                            </Badge>
                          ) : element.status === "cancel" ? (
                            <Badge className="bg-danger rounded-circle">
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="text-white"
                                style={{ width: "15px", height: "20px" }}
                              />
                            </Badge>
                          ) : element.status === "success" ? (
                            <Badge className="bg-success rounded-circle">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-white"
                                style={{
                                  fontSize: "10px",
                                  width: "15px",
                                  height: "20px",
                                }}
                              />
                            </Badge>
                          ) : null}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col>
            <p className="fs-3 my-3">Grafik Transaction</p>
            <Bar className="w-100" options={options} data={dataBar} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
