import * as jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toCurrency } from "./utils.js";

// TODO: multiple pages when rides table does not fit in a single page
// TODO: Check account
export function printInvoice(invoice) {
  const doc = new jsPDF.jsPDF();

  // const totalPagesExp = '{total_pages_count_string}'
  if (!invoice.date) {
    doc.setFontSize(19);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(255, 0, 0);

    doc.text("DRAFT", 100, 20);
    doc.setTextColor(0, 0, 0);
  }
  let file = require("../public/logo.js");
  doc.addImage(file.logo, "png", 13, 13, 17.4, 14.4);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);

  doc.text("CYTRANSOLUTIONS LTD", 13, 34.8);

  doc.setFontSize(19);

  doc.text("Invoice", 197, 34.8, null, null, "right");
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text("Invoice No.", 170, 41.2);
  doc.text(
    invoice.date
      ? "Date: " + new Date(invoice.date).toLocaleDateString("en-UK")
      : "DRAFT",
    197,
    65.8,
    null,
    null,
    "right"
  );

  doc.setFont("Helvetica", "bold");
  doc.text(invoice.code, 197, 41.2, null, null, "right");

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7);

  doc.text("Amathountos 34, Shop 8,", 13, 38.2);
  doc.text("Limassol, 4532", 13, 41.2);
  doc.text("Tel: +35799667777", 13, 44.2);
  doc.text("Email: 99667777cy@gmail.com", 13, 47.2);
  doc.text("VAT no : 10361018V", 13, 50.2);

  doc.text("Bill To:", 13, 61.8);
  if (invoice.client.email) {
    doc.text(["Email: ", invoice.client.email], 13, 70.5);
  }
  if (invoice.client.tel) {
    doc.text(["Tel: ", invoice.client.tel], 13, 76.5);
  }

  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(invoice.client.name, 13, 65.8);

  // if (typeof doc.putTotalPages() === 'function') {
  //     str = str + 'of ' + totalPagesExp
  // }

  // doc.text(str, 13, 250)

  doc.autoTable({
    startY: 85,
    headStyles: { fillColor: [50, 50, 50] },
    margin: { left: 13, right: 13, bottom: 55 },
    rowPageBrake: "avoid",
    styles: {
      fontSize: 9,
    },
    head: [["Date", "Passenger", "Itinerary", "Notes", "Price"]],
    body: invoice.rides.map((ride) => {
      return [
        new Date(ride.date).toLocaleDateString("en-UK"),
        ride.passenger,
        ride.from + " - " + ride.to,
        ride.notes,
        ride.inv_credit ? ride.inv_credit : ride.credit,
      ];
    }),

  });

  let finalY = doc.lastAutoTable.finalY;

  const vat_adj_sub = invoice.vat_included ? 100/109 : 1
  const vat_adj_vat = invoice.vat_included ? 9/109 : 9/100
  const vat_adj_tot = invoice.vat_included ? 1 : 109/100
  doc.line(13, finalY + 5, 197, finalY + 5);

  doc.setFontSize(11);
  doc.setFont("Helvetica", "normal");
  if (!invoice.vat_included) {
    doc.text("Subtotal:", 150, finalY + 10);
    doc.text(
      `${toCurrency(invoice.inv_total ? invoice.inv_total * vat_adj_sub : invoice.total * vat_adj_sub)}`,
      197,
      finalY + 10,
      null,
      null,
      "right"
    );
  }
  doc.text(`VAT 9%: ${invoice.vat_included ? "inc." : ""}`, 150, finalY + 15);
  doc.text(
    `${toCurrency((invoice.inv_total ? invoice.inv_total * vat_adj_vat : invoice.total * vat_adj_vat))}`,
    197,
    finalY + 15,
    null,
    null,
    "right"
  );
  doc.text("Total:", 150, finalY + 20);
  doc.setFont("Helvetica", "bold");
  doc.text(
    `${toCurrency(invoice.inv_total ? invoice.inv_total * vat_adj_tot : invoice.total * vat_adj_tot)}`,
    197,
    finalY + 20,
    null,
    null,
    "right"
  );

  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text("Notes: ", 13, finalY + 30);
  if (invoice.notes) {
    doc.text(invoice.notes, 13, finalY + 35);
  }

  let pageCount = doc.internal.getNumberOfPages();
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);
    let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
    doc.text(
      "page: " + pageCurrent + " of " + pageCount,
      13,
      doc.internal.pageSize.height - 35
    );

    if (pageCount > pageCurrent) {
      doc.text(
        "continues to next page",
        197,
        doc.internal.pageSize.height - 45,
        null,
        null,
        "right"
      );
    }
    doc.line(13, 270, 197, 270, "S");
    doc.text(
      [
        "Account name: CYTRANSOLUTIONS LTD",
        "Account number: 357026026038",
        "IBAN: CY47002001950000357026026038",
        "BIC: BCYPCY2N",
      ],
      13,
      275
    );
  }

  // console.log(`${invoice.date ? new Date(invoice.date).toLocaleDateString("en-US") : "DRAFT" }_${invoice.code.replace("/", "-")}_${invoice.client.name}.pdf`);
  doc.save(
    `${
      invoice.date ? new Date(invoice.date).toISOString().slice(0, 10) : "DRAFT"
    }_${invoice.date?.toLocaleDateString("en-UK", {
      month: "short",
    })}_${invoice.code.replace("/", "-")}_${invoice.client.name}.pdf`
  );
}
