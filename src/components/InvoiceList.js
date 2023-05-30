import React from "react";
import { getAmountInCLP, getAmountInUSD } from "../utils/currency";

function InvoiceList({ invoices, selectedInvoiceId, onInvoiceChange }) {
  const typeMap = {
    received: "Recibida",
    invoice: "Factura",
    credit_note: "Nota de crédito",
  };

  const receivedInvoices = invoices.filter(
    (invoice) => invoice.type === "received"
  );

  return (
    <table>
      <tbody>
        {receivedInvoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>
              <label>
                <input
                  type="radio"
                  name="invoice"
                  value={invoice.id}
                  checked={selectedInvoiceId === invoice.id}
                  onChange={onInvoiceChange}
                />
              </label>
              <strong>{invoice.id}</strong>({invoice.organization_id})
            </td>
            <td>
              <strong>
                ${getAmountInCLP(invoice.amount, invoice.currency)} CLP
              </strong>{" "}
              (${getAmountInUSD(invoice.amount, invoice.currency)} USD)
            </td>
            <td>{typeMap[invoice.type]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { getAmountInCLP, getAmountInUSD };
export default InvoiceList;
