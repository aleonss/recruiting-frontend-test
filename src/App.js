import React, { Component } from "react";
import axios from "axios";
import InvoiceList from "./components/InvoiceList";
import CreditNoteList from "./components/CreditNoteList";
import SuccessModal from "./components/SuccessModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      selectedInvoiceId: null,
      selectedCreditNoteId: null,
      creditNotes: [],
      loading: true,
      error: null,
      assignmentSuccess: false,
    };
  }

  componentDidMount() {
    axios
      .get(`https://recruiting.api.bemmbo.com/invoices/pending`)
      .then((res) => {
        const invoices = res.data;
        this.setState({
          invoices: invoices,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err,
        });
      });
  }

  handleInvoiceChange = (event) => {
    const invoiceId = event.target.value;

    axios
      .get(
        `https://recruiting.api.bemmbo.com/invoices/pending?reference=${invoiceId}`
      )
      .then((res) => {
        const creditNotes = res.data.filter(
          (invoice) => invoice.type === "credit_note"
        );
        this.setState({
          selectedInvoiceId: invoiceId,
          creditNotes: creditNotes,
        });
      })
      .catch((err) => {
        this.setState({
          selectedInvoiceId: invoiceId,
          creditNotes: [],
          error: err,
        });
      });
  };

  handleCreditNoteChange = (event) => {
    const creditNoteId = event.target.value;
    this.setState({
      selectedCreditNoteId: creditNoteId,
    });
  };

  handleAssignClick = () => {
    // Acciones necesarias para realizar la asignación (Solicitud POST)
    this.setState({
      assignmentSuccess: true,
    });
  };

  handleResetClick = () => {
    this.setState({
      selectedInvoiceId: null,
      selectedCreditNoteId: null,
      creditNotes: [],
      assignmentSuccess: false,
    });
  };

  render() {
    const {
      invoices,
      loading,
      error,
      creditNotes,
      selectedInvoiceId,
      selectedCreditNoteId,
    } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;

    return (
      <div>
        <h1>Selecciona una factura</h1>
        <InvoiceList
          invoices={invoices}
          selectedInvoiceId={selectedInvoiceId}
          onInvoiceChange={this.handleInvoiceChange}
        />

        {selectedInvoiceId && (
          <div>
            <CreditNoteList
              creditNotes={creditNotes}
              selectedCreditNoteId={selectedCreditNoteId}
              selectedInvoiceId={selectedInvoiceId}
              onCreditNoteChange={this.handleCreditNoteChange}
            />

            {selectedCreditNoteId && (
              <button onClick={this.handleAssignClick}>Asignar</button>
            )}

            {this.state.assignmentSuccess && (
              <SuccessModal
                selectedInvoiceId={selectedInvoiceId}
                selectedCreditNoteId={selectedCreditNoteId}
                selectedCreditNote={creditNotes.find(
                  (creditNote) => creditNote.id === selectedCreditNoteId
                )}
                onResetClick={this.handleResetClick}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
