import React from "react";
import { getAmountInCLP, getAmountInUSD } from "../utils/currency";

function SuccessModal({
  selectedInvoiceId,
  selectedCreditNoteId,
  selectedCreditNote,
  onResetClick,
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Nota de crédito asignada correctamente</h3>
        <h4>Detalles:</h4>
        <table>
          <tbody>
            <tr>
              <td>Factura:</td>
              <td>{selectedInvoiceId}</td>
            </tr>
            <tr>
              <td>Nota de crédito:</td>
              <td>{selectedCreditNoteId}</td>
            </tr>
            <tr>
              <td>Monto:</td>

              <td>
                <strong>
                  $
                  {getAmountInCLP(
                    selectedCreditNote.amount,
                    selectedCreditNote.currency
                  )}{" "}
                  CLP
                </strong>{" "}
                ($
                {getAmountInUSD(
                  selectedCreditNote.amount,
                  selectedCreditNote.currency
                )}{" "}
                USD)
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={onResetClick}>Seguir asignando</button>
      </div>
    </div>
  );
}

export default SuccessModal;
