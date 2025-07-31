// controllers/quotationController.js
const Quotation = require('../../../models/quotation');
const Company = require('../../../models/company');
const catchAsync = require('../../../utils/catchAsync');
const PDFDocument = require('pdfkit');
const path = require('path');
const AppError = require('../../../utils/AppError');

exports.generateQuotationPDF = catchAsync(async (req, res, next) => {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return next(new AppError('Please set up your company details first', 404));

    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) return next(new AppError('No quotation found with that ID', 404));

    let pdfBuffer;
    try {
        pdfBuffer = await createQuotationPDF(quotation.toObject(), company.toObject());
    } catch (err) {
        console.error(err);
        return next(new AppError('Error generating PDF', 500));
    }

    res.status(200).set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=quotation-${quotation._id}.pdf`,
        'Content-Length': pdfBuffer.length
    }).send(pdfBuffer);
});

function createQuotationPDF(quotationData, companyData) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: "A4", margin: 40 });
        const chunks = [];

        doc.on("data", chunk => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", err => reject(err));

        const company = companyData;
        const form = quotationData.formData;

        // Page 1 header
        doc.rect(0, 0, doc.page.width, 100).fill('#000');
        doc.fillColor('#fff').fontSize(10).text(`Quotation No: ${form.quotationDetails.quotationNumber}`, 50, 40);
        doc.text(`Date: ${form.quotationDetails.qtdate}`, 450, 40, { align: 'right' });
        if (company.logo) {
            doc.image(path.join(__dirname, '../../../../', company.logo), 250, 10, { width: 100 });
        }

        // Title and greeting
        doc.moveDown(3);
        doc.fillColor('#000').fontSize(18).text('QUOTATION', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(10).text(`To, ${form.quotationDetails.partyname}`);
        doc.text('Thank you for your inquiry. Please find our quotation below.');
        doc.moveDown();

        // Detail Table
        const detailTableTop = doc.y;
        drawTable(doc, [
            ['Name', form.quotationDetails.partyname, 'Company Name', form.quotationDetails.companyName],
            ['Mobile No', form.quotationDetails.mobileNo || '', 'Email', form.quotationDetails.email],
            ['Vehicle Type', form.quotationDetails.movingType, 'Shifting Date', form.quotationDetails.shiptdate],
        ], detailTableTop);

        // Particulars section
        doc.moveDown(2);
        doc.font('Helvetica-Bold').fontSize(12).text('PARTICULAR (Packing and Shifting)', { align: 'center' });

        const serviceTableTop = doc.y + 10;
        const serviceCharges = form.paymentDetails || {};
        const items = [
            ['Packing Charges', `₹${serviceCharges.pakingcharge || 0}`],
            ['Unpacking Charges', `₹${serviceCharges.unpakingcharge || 0}`],
            ['Loading Charges', `₹${serviceCharges.lodingcharge || 0}`],
            ['Unloading Charges', `₹${serviceCharges.unloadingcharge || 0}`],
            ['Packing Material Charges', `₹${serviceCharges.packingmaterialcharge || 0}`],
            ['Storage Charges', `₹${serviceCharges.storgecharge || 0}`],
            ['Car/Bike Transport', `₹${serviceCharges.carbiketpt || 0}`],
            ['Miscellaneous Charges', `₹${serviceCharges.miscellaneouscharge || 0}`],
            ['Other Charges', `₹${serviceCharges.othercharge || 0}`],
            ['ST Charge', `₹${serviceCharges.stcharge || 0}`],
            ['Octroi/Green Tax', `₹${serviceCharges.octriogreentax || 0}`],
            ['Surcharge', `${serviceCharges.surcharge || ''}`],
            ['Discount', `${serviceCharges.discount || ''}`],
            ['GST Type', `${serviceCharges.gsttype || ''}`],
            ['GST Percent', `${serviceCharges.gstPercent || ''}%`],
        ];
        drawSimpleTable(doc, [['Particular', 'Amount'], ...items], serviceTableTop);

        doc.moveDown();
        if (form.paymentDetails?.remark) {
            doc.font('Helvetica').fontSize(10).text(`Remark: ${form.paymentDetails.remark}`);
        }

        // Footer Signatures
        doc.moveDown(5);
        doc.fontSize(10).fillColor('#000').text('Customer Name:', 50);
        doc.fillColor('#007BFF').text(form.quotationDetails.partyname, 50, doc.y);
        doc.fillColor('#000').text('Authority Signature:', 50, doc.y + 20);
        doc.text('Customer Signature:', 400);

        // Page 2
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 60).fill('#e0e0e0');
        doc.fillColor('#000').fontSize(12).text('Have any question?', 50, 20);
        doc.fontSize(10).text(`${company.contactNumber1} / ${company.email}`, 200, 20);

        doc.moveDown(2);
        doc.fontSize(10)
            .text(`Name: ${company.name}`)
            .text(`Address: ${company.address}`)
            .text(`Mobile: ${company.contactNumber1}`)
            .text(`Email: ${company.email}`)
            .text(`Website: ${company.website}`)
            .text(`GST: ${company.gstNo}`)
            .text(`PAN: ${company.pan}`)
            .moveDown()
            .fontSize(8).text('This is a computer-generated document, signature is not required.');

        doc.moveDown(2);
        doc.fontSize(11).text('Moving Item Details', { underline: true });
        const goods = form.items || [];
        const goodsTable = [['Sr No', 'Goods Description', 'Quantity', 'Value INR', 'Remark']];
        goods.forEach((g, i) => {
            goodsTable.push([
                String(i + 1),
                g.name || '',
                String(g.qty || ''),
                `₹${g.value || ''}`,
                g.remark || ''
            ]);
        });
        drawSimpleTable(doc, goodsTable, doc.y);

        doc.end();
    });
}

function drawTable(doc, data, y) {
    const startX = 50;
    const rowHeight = 25;
    const colWidths = [80, 170, 100, 170];

    data.forEach((row, rowIndex) => {
        let x = startX;
        row.forEach((cell, colIndex) => {
            doc.rect(x, y + rowIndex * rowHeight, colWidths[colIndex], rowHeight).stroke();
            doc.fontSize(9).text(cell, x + 5, y + rowIndex * rowHeight + 7, {
                width: colWidths[colIndex] - 10,
                height: rowHeight,
            });
            x += colWidths[colIndex];
        });
    });
}

function drawSimpleTable(doc, rows, y) {
    const startX = 50;
    const colWidths = rows[0].length === 2 ? [400, 100] : [40, 180, 80, 100, 100];
    const rowHeight = 25;

    rows.forEach((row, rowIndex) => {
        let x = startX;
        row.forEach((cell, colIndex) => {
            doc.rect(x, y + rowIndex * rowHeight, colWidths[colIndex], rowHeight).stroke();
            doc.fontSize(9).text(cell, x + 5, y + rowIndex * rowHeight + 7, {
                width: colWidths[colIndex] - 10,
                height: rowHeight,
            });
            x += colWidths[colIndex];
        });
    });
}
