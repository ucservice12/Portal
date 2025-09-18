const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  static async generateInvoice(invoice, organization) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `invoice-${invoice.invoiceNumber}.pdf`;
        const filepath = path.join(__dirname, '../../public/uploads/invoices', filename);

        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const stream = fs.createWriteStream(filepath);
        doc.pipe(stream);

        // Header
        doc.fontSize(20)
           .text('INVOICE', 50, 50, { align: 'center' })
           .fontSize(12);

        // Company info
        doc.text(organization.name, 50, 100)
           .text(organization.contact.address.street || '', 50, 115)
           .text(`${organization.contact.address.city || ''}, ${organization.contact.address.state || ''} ${organization.contact.address.zipCode || ''}`, 50, 130)
           .text(organization.contact.email || '', 50, 145)
           .text(organization.contact.phone || '', 50, 160);

        // Invoice details
        doc.text(`Invoice #: ${invoice.invoiceNumber}`, 350, 100)
           .text(`Date: ${invoice.issueDate.toDateString()}`, 350, 115)
           .text(`Due Date: ${invoice.dueDate.toDateString()}`, 350, 130)
           .text(`Status: ${invoice.status.toUpperCase()}`, 350, 145);

        // Client info
        doc.text('Bill To:', 50, 200)
           .text(invoice.client.fullName, 50, 215)
           .text(invoice.client.company || '', 50, 230)
           .text(invoice.client.email, 50, 245)
           .text(invoice.client.phone || '', 50, 260);

        // Items table
        const tableTop = 320;
        const itemCodeX = 50;
        const descriptionX = 150;
        const quantityX = 350;
        const rateX = 400;
        const amountX = 480;

        // Table header
        doc.text('Item', itemCodeX, tableTop)
           .text('Description', descriptionX, tableTop)
           .text('Qty', quantityX, tableTop)
           .text('Rate', rateX, tableTop)
           .text('Amount', amountX, tableTop);

        // Draw line under header
        doc.moveTo(50, tableTop + 15)
           .lineTo(550, tableTop + 15)
           .stroke();

        let position = tableTop + 30;

        // Items
        invoice.items.forEach((item, index) => {
          doc.text(index + 1, itemCodeX, position)
             .text(item.description, descriptionX, position)
             .text(item.quantity.toString(), quantityX, position)
             .text(`$${item.rate.toFixed(2)}`, rateX, position)
             .text(`$${item.amount.toFixed(2)}`, amountX, position);
          
          position += 20;
        });

        // Draw line after items
        doc.moveTo(50, position + 10)
           .lineTo(550, position + 10)
           .stroke();

        // Totals
        const totalsX = 400;
        position += 30;

        doc.text('Subtotal:', totalsX, position)
           .text(`$${invoice.subtotal.toFixed(2)}`, amountX, position);

        if (invoice.discountAmount > 0) {
          position += 20;
          doc.text('Discount:', totalsX, position)
             .text(`-$${invoice.discountAmount.toFixed(2)}`, amountX, position);
        }

        if (invoice.taxAmount > 0) {
          position += 20;
          doc.text(`Tax (${invoice.taxRate}%):`, totalsX, position)
             .text(`$${invoice.taxAmount.toFixed(2)}`, amountX, position);
        }

        position += 20;
        doc.fontSize(14)
           .text('Total:', totalsX, position)
           .text(`$${invoice.total.toFixed(2)}`, amountX, position)
           .fontSize(12);

        // Notes and terms
        if (invoice.notes) {
          position += 50;
          doc.text('Notes:', 50, position)
             .text(invoice.notes, 50, position + 15, { width: 500 });
        }

        if (invoice.terms) {
          position += 80;
          doc.text('Terms & Conditions:', 50, position)
             .text(invoice.terms, 50, position + 15, { width: 500 });
        }

        // Footer
        doc.text('Thank you for your business!', 50, doc.page.height - 100, {
          align: 'center',
          width: 500
        });

        doc.end();

        stream.on('finish', () => {
          resolve(filepath);
        });

        stream.on('error', (error) => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  static async generateQuote(quote, organization) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `quote-${quote.quoteNumber}.pdf`;
        const filepath = path.join(__dirname, '../../public/uploads/quotes', filename);

        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const stream = fs.createWriteStream(filepath);
        doc.pipe(stream);

        // Similar structure to invoice but for quotes
        doc.fontSize(20)
           .text('QUOTATION', 50, 50, { align: 'center' })
           .fontSize(12);

        // Company info
        doc.text(organization.name, 50, 100)
           .text(organization.contact.address.street || '', 50, 115)
           .text(`${organization.contact.address.city || ''}, ${organization.contact.address.state || ''} ${organization.contact.address.zipCode || ''}`, 50, 130)
           .text(organization.contact.email || '', 50, 145)
           .text(organization.contact.phone || '', 50, 160);

        // Quote details
        doc.text(`Quote #: ${quote.quoteNumber}`, 350, 100)
           .text(`Date: ${quote.issueDate.toDateString()}`, 350, 115)
           .text(`Valid Until: ${quote.validUntil.toDateString()}`, 350, 130)
           .text(`Status: ${quote.status.toUpperCase()}`, 350, 145);

        // Rest similar to invoice...

        doc.end();

        stream.on('finish', () => {
          resolve(filepath);
        });

        stream.on('error', (error) => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  static async generateReport(reportData, reportType) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `${reportType}-report-${Date.now()}.pdf`;
        const filepath = path.join(__dirname, '../../public/uploads/reports', filename);

        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const stream = fs.createWriteStream(filepath);
        doc.pipe(stream);

        // Report header
        doc.fontSize(20)
           .text(reportData.title || 'Report', 50, 50, { align: 'center' })
           .fontSize(12);

        doc.text(`Generated on: ${new Date().toDateString()}`, 50, 100)
           .text(`Report Type: ${reportType}`, 50, 115);

        // Report content based on type
        let position = 150;

        if (reportData.summary) {
          doc.fontSize(14)
             .text('Summary', 50, position)
             .fontSize(12);
          
          position += 25;
          
          Object.entries(reportData.summary).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 50, position);
            position += 20;
          });
        }

        if (reportData.data && Array.isArray(reportData.data)) {
          position += 20;
          doc.fontSize(14)
             .text('Details', 50, position)
             .fontSize(12);
          
          position += 25;

          reportData.data.forEach((item, index) => {
            doc.text(`${index + 1}. ${JSON.stringify(item)}`, 50, position, { width: 500 });
            position += 20;
          });
        }

        doc.end();

        stream.on('finish', () => {
          resolve(filepath);
        });

        stream.on('error', (error) => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = PDFGenerator;