import React from "react";
import { getAmountInCLP, getAmountInUSD } from "../utils/currency";

function CreditNoteList({
  creditNotes,
  selectedCreditNoteId,
  onCreditNoteChange,
  selectedInvoiceId,
}) {
  return (
    <div>
      <h2>Selecciona una nota de crédito</h2>
      <table>
        <tbody>
          {creditNotes.map((creditNote) => (
            <tr key={creditNote.id}>
              <td>
                <label>
                  <input
                    type="radio"
                    name="creditNote"
                    value={creditNote.id}
                    checked={selectedCreditNoteId === creditNote.id}
                    onChange={onCreditNoteChange}
                  />
                </label>
                <strong>{creditNote.id}</strong>({creditNote.organization_id})
              </td>
              <td>
                <strong>
                  ${getAmountInCLP(creditNote.amount, creditNote.currency)} CLP
                </strong>{" "}
                (${getAmountInUSD(creditNote.amount, creditNote.currency)} USD)
              </td>
              <td>{selectedInvoiceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreditNoteList;
