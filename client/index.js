import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import UserLogin from "./routes/UserLogin";
import SecretPage from "./routes/secret-page.jsx";
import UserCreator from "./routes/UserCreator.js";
import MessageDisplay from "./routes/MessageDisplay.js";

import styles from "./scss/application.scss";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<UserLogin />} />
        <Route path="signup" element={<UserCreator />} />
        <Route path="chatroom" element={<MessageDisplay />} />
        <Route path="secretPage" element={<SecretPage />} />
        <Route
          path="*"
          element={
            <main>
              <p>There's Nothing Here!</p>
            </main>
          }
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
