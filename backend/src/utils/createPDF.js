// utils/createPDF.js
const PDFDocument = require('pdfkit');
const path = require('path');

async function createQuotationPDF(quotationData) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks = [];

        // collect PDF chunks into memory
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('error', (err) => reject(err));

        // once done, resolve with a single Buffer
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);
            resolve(pdfBuffer);
        });

        // ——— PDF content begins here ———

        // company logo
        if (quotationData.company?.logo) {
            doc.image(
                path.join(__dirname, '../../', quotationData.company.logo),
                50, 50,
                { width: 100 }
            );
        }

        // title
        doc.fontSize(20).text('Quotation', { align: 'center' });
        doc.moveDown();

        // company details
        if (quotationData.company) {
            doc
                .fontSize(12).text(`Company: ${quotationData.company.name}`)
                .fontSize(10)
                .text(`Address: ${quotationData.company.address}`)
                .text(`Phone: ${quotationData.company.phone}`)
                .text(`Email: ${quotationData.company.email}`);
        }

        doc.moveDown();

        // quotation details
        const { quotationDetails } = quotationData.formData;
        doc
            .fontSize(12)
            .text(`Quotation Number: ${quotationDetails.quotationNumber}`)
            .text(`Moving Type: ${quotationDetails.movingType}`)
            .text(`Client Company: ${quotationDetails.companyName}`)
            .text(`Packing Date: ${new Date(quotationDetails.packingDate).toLocaleDateString()}`);

        doc.moveDown();

        // moving details
        doc.fontSize(12).text('Moving Details:', { underline: true });
        doc.fontSize(10)
            .text('From:')
            .text(`  State: ${quotationData.formData.moveFrom.state}`)
            .text(`  City: ${quotationData.formData.moveFrom.city}`)
            .text(`  Lift Available: ${quotationData.formData.moveFrom.isLiftAvailable}`)
            .moveDown()
            .text('To:')
            .text(`  State: ${quotationData.formData.moveTo.state}`)
            .text(`  City: ${quotationData.formData.moveTo.city}`)
            .text(`  Lift Available: ${quotationData.formData.moveTo.isLiftAvailable}`);

        doc.moveDown();

        // items table header
        const tableTop = doc.y + 10;
        const itemX = 50;
        const qtyX = 350;
        doc.fontSize(11)
            .text('Item', itemX, tableTop)
            .text('Quantity', qtyX, tableTop);
        doc.moveTo(itemX, tableTop + 15).lineTo(550, tableTop + 15).stroke();

        // items
        let y = tableTop + 30;
        quotationData.formData.items.forEach(item => {
            doc.fontSize(10)
                .text(item.name || '', itemX, y)
                .text(String(item.qty || ''), qtyX, y);
            y += 20;
        });

        doc.moveDown();

        // payment details
        const pay = quotationData.formData.paymentDetails;
        doc
            .fontSize(12).text('Payment Details:', { underline: true })
            .fontSize(10)
            .text(`Freight Charge: ₹${pay.freightCharge}`)
            .text(`Advance Paid:    ₹${pay.advancePaid}`)
            .text(`GST:              ${pay.gstPercent}%`)
            .text(`Balance:         ₹${pay.freightCharge - pay.advancePaid}`)
            .text(`Total (inc. GST): ₹${pay.freightCharge * (1 + pay.gstPercent / 100)}`);

        doc.moveDown();

        // insurance
        const ins = quotationData.formData.insurance;
        doc
            .fontSize(12).text('Insurance Details:', { underline: true })
            .fontSize(10)
            .text(`Insurance Type:       ${ins.type}`)
            .text(`Insurance Percentage: ${ins.percent}%`)
            .text(`Vehicle Insurance:    ${quotationData.formData.vehicleInsurance.type}`);

        // special needs
        if (quotationData.formData.otherDetails.specialNeeds) {
            doc.moveDown()
                .fontSize(12).text('Special Requirements:', { underline: true })
                .fontSize(10).text(quotationData.formData.otherDetails.specialNeeds);
        }

        doc.moveDown();

        // signature
        if (quotationData.company?.sign) {
            doc.image(
                path.join(__dirname, '../../', quotationData.company.sign),
                450, doc.y, { width: 100 }
            );
            doc.moveDown().fontSize(10).text('Authorized Signature', 450, doc.y + 20);
        }

        // status & timestamps
        doc.moveDown()
            .fontSize(8)
            .text(`Status: ${quotationData.status}`)
            .text(`Created: ${new Date(quotationData.createdAt).toLocaleString()}`)
            .text(`Last Updated: ${new Date(quotationData.updatedAt).toLocaleString()}`);

        // finalize
        doc.end();
    });
}

module.exports = { createQuotationPDF };
