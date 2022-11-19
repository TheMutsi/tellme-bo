import { useState } from "react";
import logo from "./logo.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./App.css";
import { findAllByTitle } from "@testing-library/dom";

function App() {
  const [resumen, setResumen] = useState();
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const [categories, setCategories] = useState();

  const validateForm = () => {
    let isOk = true;
    let message = "";
    if (resumen === "") {
      message = "El resumen es requerido\n";
      isOk = false;
    }
    if (title === "") {
      message += "El title es requerido\n";
      isOk = false;
    }
    if (body === "") {
      message += "El body es requerido\n";
      isOk = false;
    }
    if (categories === "") {
      message += "Las categories es requerido\n";
      isOk = false;
    }
    if (!isOk) {
      alert(message);
    }
    return isOk;
  };
  const save = () => {
    if (!validateForm()) return;

    const bodyT = {
      titulo: title,
      resumen: resumen,
      cuerpo: body,
      autor: 0,
      idioma: "es",
      categorias: categories.split(","),
    };
    fetch(
      "https://bsj1sh8bc7.execute-api.us-east-1.amazonaws.com/STG/v1/noticia",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyT),
      }
    )
      .then((r) => {
        console.log("r");
        alert("La noticia fue guardada con exito");
      })
      .catch((e) => {
        alert("Hubo un error al cargar la noticia, intente mas tarde");
      });

    cleanData();
  };
  const cleanData = () => {
    setResumen("");
    // setBody("");
    setTitle("");
    setCategories("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    save();
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 style={{ marginBottom: 30, marginTop: -10, color: "orange" }}>
        Cargador de noticias
      </h1>
      <Form onSubmit={onFormSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 700 }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Titulo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el titulo"
                onChange={({ target: { value } }) => setTitle(value)}
                value={title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Resumen:</Form.Label>
              <textarea
                class="form-control"
                id="resumen"
                placeholder="Ingresa el resumen"
                rows="3"
                onChange={({ target: { value } }) => setResumen(value)}
                value={resumen}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cuerpo:</Form.Label>
              <textarea
                class="form-control"
                id="resumen"
                placeholder="Ingresa el cuerpo"
                rows="3"
                onChange={({ target: { value } }) => setBody(value)}
                value={body}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categorias: (Separadas por coma)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa las categorias"
                onChange={({ target: { value } }) => setCategories(value)}
                value={categories}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onSubmit={save}
              style={{ backgroundColor: "orange", borderColor: "orange" }}
            >
              Guardar
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default App;
