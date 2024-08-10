var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AT7LtKnpSqPHn6ZEaTpdz_HM2sggDbtK2mYMwCMDxk4Dx59bPo6EcWRoi9fCXPlsEISIoQZ_6vDf1fST',
  'client_secret': 'EMMicJDsAZrOIAY31LP2btUYKLqNaswTJNDnNybiwmjY5SpErXWooGRdd0wHHNOjN1UO4akhrNufFVbZ'
});
module.exports = paypal;