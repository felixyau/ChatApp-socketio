import "./App.css";
import io from "socket.io-client";
import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"

function App() {

  return (
    <>

      <div>
        <CssBaseline />
        <BrowserRouter>
          {/* <Navbar /> */}
          <Container
            maxWidth="lg"
            // style={{ backgroundColor: "#f3f4f5" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Routes>
                {/* <Route path="*" element={<R404 />} /> */}
                <Route path="/login" element={<Login/>} />
              </Routes>
            </div>
          </Container>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
