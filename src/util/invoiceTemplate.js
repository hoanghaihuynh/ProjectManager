const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateInvoice(order, outputPath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            }
        });

        const fontPath = path.join(__dirname, '../public/font', 'VNFlorensans.ttf');
        doc.pipe(fs.createWriteStream(outputPath));
        doc.font(fontPath);

        function generateHeader(doc) {
            doc.fontSize(20).text('HÓA ĐƠN THANH TOÁN', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text('EAVES COFFEE', { align: 'center' });
            doc.text('ĐC: Đại Học Công nghệ Sài Gòn', { align: 'center' });
            doc.text('SDT: 0327786217', { align: 'center' });
            doc.moveDown();
            doc.text(`Số HĐ: ${order._id}`, { align: 'left' });
            doc.text(`Ngày: ${order.createdAt.toLocaleDateString()}`, { align: 'left' });
            doc.moveDown();
        }
       
        function generateBody(doc) {
            const startX = 50;
            const startY = doc.y;
            const headerY = doc.y;
            const columnWidth = 150;
            const rowHeight = 30;

            doc.text('Sản phẩm', startX, headerY, { width: columnWidth, align: 'center' });
            doc.text('Đơn giá', startX + columnWidth, headerY, { width: columnWidth, align: 'center' });
            doc.text('SL', startX + 2 * columnWidth, headerY, { width: columnWidth, align: 'center' });
            doc.text('TT', startX + 3 * columnWidth, headerY, { width: columnWidth, align: 'center' });

            order.items.forEach((product, index) => {
                const rowY = headerY + (index + 1) * rowHeight;
                doc.text(product.name, startX, rowY, { width: columnWidth, align: 'center' });
                doc.text(product.priceItem.toString(), startX + columnWidth, rowY, { width: columnWidth, align: 'center' });
                doc.text(product.quantity.toString(), startX + 2 * columnWidth, rowY, { width: columnWidth, align: 'center' });
                doc.text(product.totalPrice.toString(), startX + 3 * columnWidth, rowY, { width: columnWidth, align: 'center' });
            });

            const totalY = startY + (order.items.length + 1) * rowHeight;
            doc.text(`Tổng thành tiền: ${order.subTotal || 0}`, startX + 2 * columnWidth, totalY, { width: 2 * columnWidth, align: 'left' });
            doc.text(`Tổng cộng: ${order.totalPrice}`, startX + 2 * columnWidth, totalY + 20, { width: 2 * columnWidth, align: 'left' });
            doc.moveDown();
        }

        function generateFooter(doc) {
            const startY = doc.y + 50;
            doc.text('----------------', 50, startY, { align: 'center', width: 500 });
            doc.text('EAVES xin cảm ơn, hẹn gặp lại quý khách!', { align: 'center', width: 500 });
            doc.text('Pass wifi: eavesofyou', { align: 'center', width: 500 });
        }

        generateHeader(doc);
        generateBody(doc);
        generateFooter(doc);

        doc.end();

        
        doc.on('finish', () => {
            resolve(outputPath);
        });

        doc.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = generateInvoice;
