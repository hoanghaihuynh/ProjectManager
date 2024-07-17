const nodemailer = require('nodemailer');
class ContactController {
    //[GET] /
    index(req,res){
        res.render('user/contact', { layout: 'mainUser.hbs'});
    }
    sendEmail(req, res) {
        const { name, email, message } = req.body;

        // Tạo transporter sử dụng Gmail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hau69710@gmail.com', 
                pass: 'zpoj ijzf duuz dauz'
            }
        });

        // Tạo nội dung email
        let mailOptions = {
            from: 'hau69710@gmail.com',
            to: 'hau697102@gmail.com',
            subject: 'Thông tin liên hệ từ ' + name, 
            text: message + '\n\nĐược gửi bởi: ' + email 
        };

        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Có lỗi xảy ra khi gửi email.');
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('/');
            }
        });
    }
}

module.exports= new ContactController