const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://honghihunh:VM7vWYkliImqsEiM@cluster0.tkt1sgp.mongodb.net/QLCF', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connect successfully!!!')
    }catch(error){
        console.log('Connect failure!!!')
    }
}
module.exports = { connect }