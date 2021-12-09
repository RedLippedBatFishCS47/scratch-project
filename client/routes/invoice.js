import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import { getInvoice, deleteInvoice } from './data';

const Invoice = () => {
  let navigate = useNavigate();
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceID, 10));

  return (
    <main>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>
      <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
};

export default Invoice;
