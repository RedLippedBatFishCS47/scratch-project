import React from "react";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>CHAT ZONE</h1>
      <nav>
        <Link to="/invoices">View Invoices???</Link>
        <Link to="/secretPage">A Different Page</Link>
        <Link to="/message-display">Type A Message</Link>
      </nav>
      <Outlet/>
    </div>
  );
};

export default App;
