const helpers={};
const bcrypt = require('bcryptjs');

helpers.encryptPassword =async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

helpers.mathPassword = async (password, savedPassword)=>{
    try{
        return await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
};

module.exports= helpers;
