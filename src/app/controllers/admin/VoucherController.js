const Voucher=require('../../models/Voucher')
const { mutipleMongooseToObject, mongooseToObject }=require('../../../util/mongoose')

class VoucherController {
    //[GET] /
    index(req, res) {
        Voucher.find().sort({ createdAt: -1 })
            .then((vouchers) => {
                res.render('voucher', { 
                    vouchers: mutipleMongooseToObject(vouchers)
                });
            })
            .catch((err) => {
                res.status(500).json({ error: 'message' });
            });
    }
    async check(req, res) {
        try {
            const { code } = req.body;
    
            if (!code) {
                return res.status(400).json({ message: 'Voucher code is required' });
            }
    
            const voucher = await Voucher.findOne({ code, isActive: true });
    
            if (!voucher) {
                return res.status(400).json({ valid: false, discount: 0, message: 'Voucher not found or inactive' });
            }
    
            const currentDate = new Date();
            if (voucher.expirationDate < currentDate) {
                return res.status(400).json({ valid: false, discount: 0, message: 'Voucher has expired' });
            }
    
            res.status(200).json({
                valid: true,
                discountType: voucher.discountType,
                discountValue: voucher.discountValue
            });
        } catch (error) {
            console.error('Error checking voucher:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    create(req,res){
        res.render('voucher/create')
     } 
    store(req,res){
        if (req.body.isActive === 'on') {
            req.body.isActive = true;
          } else {
            req.body.isActive = false;
        }
         const voucher = new Voucher(req.body);
         voucher.save()
             .then(()=>res.redirect('/admin/voucher'))
             .catch(err=>{
                console.error('Save error:', err);
                res.status(500).json({error : 'message'})
             })
     } 
     //[GET] /voucher/:id/edit
     edit(req,res){
        Voucher.findById(req.params.id)
        .then((voucher)=>{
            res.render('voucher/edit',{ 
                voucher : mongooseToObject(voucher)
             })
        })
        .catch((err)=>{
            res.status(500).json({error : 'message'})
        })
     }
     update(req,res){
        if (req.body.isActive === 'on') {
            req.body.isActive = true;
          } else {
            req.body.isActive = false;
        }
        Voucher.updateOne({_id:req.params.id},req.body)
             .then(()=>res.redirect('/admin/voucher'))
             .catch((err)=>{
                res.status(500).json({error : 'message'})
             })
     } 
     //[DELETE] /voucher/:id
     destroy(req,res){
        Voucher.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch((err)=>{
                res.status(500).json({error : 'message'})
            })
     }
}

module.exports= new VoucherController