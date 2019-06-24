const crypto = require('crypto');
const QuickEncrypt = require('quick-encrypt')

// Generated Public Key and Private Key pair
module.exports.getRSAKeyPair = () => {
    return  QuickEncrypt.generate(1024);
}
// Generated temporary key
module.exports.tempkey = () => {
    return  crypto.randomBytes(20).toString('hex');
}
   

