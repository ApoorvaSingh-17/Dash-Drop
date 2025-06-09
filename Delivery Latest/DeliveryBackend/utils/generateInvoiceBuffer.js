import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import path from 'path';
import fs from 'fs';

export const generateInvoiceBuffer = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = new PassThrough();
      const chunks = [];

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
      doc.pipe(stream);

      // === Header with Background ===
      const pageWidth = doc.page.width;
      doc.rect(0, 0, pageWidth, 80).fill('#0077b6');

      const logoPath = path.join(process.cwd(), 'assets', 'logo.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 20, { width: 50 });
      }
      doc
        .fillColor('#fff')
        .fontSize(22)
        .font('Helvetica-Bold')
        .text('Dash & Drop Courier Services', 110, 30, { align: 'left' });

      doc.moveDown(3);
      doc.fillColor('#000').fontSize(14).text(`Invoice for Order ID: ${order._id}`, { align: 'center' });
      doc.moveDown(2);

      const marginX = 60;
      const iconSize = 12;
      const iconGap = 8;
      const lineSpacing = 18;

      // === Sender Info ===
      doc.fillColor('#023e8a').fontSize(12).font('Helvetica-Bold').text('Sender Information:', marginX);
      doc.moveDown(0.5);

      const senderY = doc.y;
      drawIconText(doc, 'icon-user.png', `Name: ${order.senderDetails.firstName} ${order.senderDetails.lastName}`, marginX, senderY);
      drawIconText(doc, 'icon-email.png', `Email: ${order.senderDetails.email}`, marginX, doc.y + 5);
      drawIconText(doc, 'icon-phone.png', `Phone: ${order.senderDetails.contactNumber}`, marginX, doc.y + 5);
      drawIconText(doc, 'icon-address.png', `Address: ${order.senderDetails.address.senderAddress}, ${order.senderDetails.address.streetAddress}, ${order.senderDetails.address.city}, ${order.senderDetails.address.state}, ${order.senderDetails.address.postalCode}`, marginX, doc.y + 5);
      doc.moveDown(1.5);

      // === Receiver Info ===
      doc.fillColor('#023e8a').fontSize(12).font('Helvetica-Bold').text('Receiver Information:', marginX);
      doc.moveDown(0.5);

      drawIconText(doc, 'icon-user.png', `Name: ${order.receiverDetails.firstName} ${order.receiverDetails.lastName}`, marginX, doc.y);
      drawIconText(doc, 'icon-phone.png', `Phone: ${order.receiverDetails.contactNumber}`, marginX, doc.y + 5);
      drawIconText(doc, 'icon-address.png', `Address: ${order.receiverDetails.address.receiverAddress}, ${order.receiverDetails.address.streetAddress}, ${order.receiverDetails.address.city}, ${order.receiverDetails.address.state}, ${order.receiverDetails.address.postalCode}`, marginX, doc.y + 5);
      doc.moveDown(1.5);

      // === Package Info ===
      doc.fillColor('#023e8a').fontSize(12).font('Helvetica-Bold').text('Package Details:', marginX);
      doc.moveDown(0.5);

      drawIconText(doc, 'icon-package.png', `Weight: ${order.packageDetails.weight} kg`, marginX, doc.y);
      drawIconText(doc, 'icon-package.png', `Courier Type: ${order.packageDetails.courierType}`, marginX, doc.y + 5);
      const pickupDate = new Date(order.packageDetails.pickupDate);
      const formattedDate = pickupDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      drawIconText(doc, 'icon-calendar.png', `Pickup Date: ${formattedDate}`, marginX, doc.y + 5);
      doc.moveDown(1.5);

      // === Charges Table ===
      doc.fillColor('#023e8a').fontSize(12).font('Helvetica-Bold').text('Charges Breakdown:', marginX);
      doc.moveDown(0.5);

      

      const tableTop = doc.y;
      const itemSpacing = 25;
      const leftX = 70;
      const rightX = 400;

      const charges = [
        { label: 'Base Fee', value: order.packageDetails.baseFee },
        { label: 'Distance Fee', value: order.packageDetails.distanceFee },
        { label: 'Weight Fee', value: order.packageDetails.weightFee },
        { label: 'Tax (18%)', value: order.packageDetails.taxAmount },
        { label: 'Total Amount', value: order.paymentDetails.amount, bold: true },
      ];

      charges.forEach((item, i) => {

        doc.font(item.bold ? 'Helvetica-Bold' : 'Helvetica')
          .fontSize(11)
          .fillColor(item.bold ? '#000' : '#333')
          .text(item.label, leftX, tableTop + i * itemSpacing)
          .text(`₹${(item.value ?? 0).toFixed(2)}`, rightX, tableTop + i * itemSpacing, { align: 'right' });
      });

      doc.moveDown(4);


      // === Thank You and Footer ===
      const FOOTER_SPACE = 70;
      const currentY = doc.y;
      const remainingSpace = doc.page.height - currentY - doc.page.margins.bottom;

      if (remainingSpace < FOOTER_SPACE) {
        doc.addPage();
      }

      // Add thank you and footer naturally after content
      doc.moveDown(2);
      doc.fontSize(11)
        .fillColor('#000')
        .text('Thank you for choosing Dash & Drop!', {
          align: 'center'
        });

      doc.moveDown(2);
      doc.fontSize(10)
        .fillColor('#6c757d')
        .text(
          'For support, contact us at: support@dashanddrop.com | Visit: www.dashanddrop.com',
          50, // starting x-position
          undefined,
          {
            align: 'center',
            width: doc.page.width - 100
          }
        );



      doc.end();

      // === Helper Function ===
      function drawIconText(doc, iconName, text, x, y) {
        const iconPath = path.join(process.cwd(), 'assets', iconName);
        if (fs.existsSync(iconPath)) {
          doc.image(iconPath, x, y, { width: iconSize, height: iconSize });
        }
        doc.font('Helvetica').fillColor('#000').fontSize(11).text(text, x + iconSize + iconGap, y);
      }

    } catch (err) {
      reject(err);
    }
  });
};

