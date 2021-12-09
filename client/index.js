import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Invoices from "./routes/invoices.jsx";
import SecretPage from "./routes/secret-page.jsx";
import MessageDisplay from "./component/MessageDisplay.js";
import Invoice from "./routes/invoice.js";

import styles from "./scss/application.scss";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="invoices" element={<Invoices />} >
          <Route
            index
            element={
              <main>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=":invoiceID" element={<Invoice />} />
        </Route>
        <Route path="secretPage" element={<SecretPage />} />
        <Route path="message-display" element={<MessageDisplay />} />
        <Route path="*" element={<main><p>There's Nothing Here!</p></main>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
