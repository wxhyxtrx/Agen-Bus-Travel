import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Card,
  Button,
} from "react-bootstrap";
import Header from "../header";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function AddTiket() {
  let navigate = useNavigate();

  const { data: bus } = useQuery("busAdmin", async () => {
    const response = await API.get("/buss");
    return response.data.data;
  });

  const { data: terminal } = useQuery("terminalAdmin", async () => {
    const response = await API.get("/terminals");
    return response.data.data;
  });

  let now = new Date();
  let liveDateTime = now.toLocaleDateString();
  let date = liveDateTime.split("/");
  let today = date[2] + "-" + date[0] + "-" + date[1];
  let weektomorrow = parseInt(date[0]) + 7;
  let maxToday = date[2] + "-" + date[0] + "-" + weektomorrow;

  const [form, setForm] = useState({
    jadwal: "",
    bus: 0,
    terminalasal: 0,
    waktuberangkat: "",
    terminaltujuan: 0,
    waktutiba: "",
    harga: 0,
    stock: 0,
  });

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

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("jadwal", form.jadwal);
      formData.set("bus", form.bus);
      formData.set("terminalasal", form.terminalasal);
      formData.set("waktuberangkat", form.waktuberangkat);
      formData.set("terminaltujuan", form.terminaltujuan);
      formData.set("waktutiba", form.waktutiba);
      formData.set("harga", form.harga);
      formData.set("stock", form.stock);

      // Insert product data
      await API.post("/tiket", formData, config);
      navigate("/tikets");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header />
      <Container className="mt-5">
        <p className="display-5">Tambah Tiket</p>
        <Card className="p-5 my-3">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Row md={4}>
              <Col className="mb-3">
                <FormLabel>Jadwal Tiket</FormLabel>
                <FormControl
                  min={today}
                  max={maxToday}
                  type="date"
                  name="jadwal"
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <FormLabel>Bus Travel</FormLabel>
                <Form.Select
                  name="bus"
                  onChange={handleChange}
                  value={form.bus}
                >
                  <option>Pilih Bus</option>
                  {bus?.map((e) => (
                    <option value={e.ID}>{e.name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <FormLabel>Stok Tiket</FormLabel>
                <FormControl
                  onChange={handleChange}
                  type="number"
                  min={1}
                  placeholder={0}
                  name="stock"
                />
              </Col>
              <Col>
                <FormLabel>Harga Tiket</FormLabel>
                <FormControl
                  onChange={handleChange}
                  type="number"
                  min={1}
                  placeholder={0}
                  name="harga"
                />
              </Col>
              <Col>
                <FormLabel>Terminal Asal</FormLabel>
                <Form.Select name="terminalasal" onChange={handleChange}>
                  <option>Pilih Terminal Asal</option>
                  {terminal?.map((e) => (
                    <option value={e.ID}>
                      {e.name} - {e.kota}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <FormLabel>Terminal Tujuan</FormLabel>
                <Form.Select name="terminaltujuan" onChange={handleChange}>
                  <option>Pilih Terminal Tujuan</option>
                  {terminal?.map((e) => (
                    <option value={e.ID}>
                      {e.name} - {e.kota}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <FormLabel>Waktu Mulai</FormLabel>
                <FormControl
                  onChange={handleChange}
                  name="waktuberangkat"
                  type="datetime-local"
                  min={today}
                  max={maxToday}
                />
              </Col>
              <Col>
                <FormLabel>Waktu Tiba</FormLabel>
                <FormControl
                  onChange={handleChange}
                  name="waktutiba"
                  type="datetime-local"
                  min={today}
                  max={maxToday}
                />
              </Col>
            </Row>
            <Button
              type="submit"
              className="w-100 mt-4"
              style={{ background: "#0758c3", border: "1px solid #0758c3" }}
            >
              Buat Tiket
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
