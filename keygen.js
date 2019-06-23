

require('crypto').randomBytes(32, function(err, buffer) { var token = buffer.toString('hex');

console.log("temp secret key: ",token);

const QuickEncrypt = require('quick-encrypt')
 
// --- RSA Keypair Generation ---
let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
//console.log(keys) // Generated Public Key and Private Key pair
let publicKey = keys.public
let privateKey = keys.private
 
// --- Encrypt using public key ---
let encryptedText = QuickEncrypt.encrypt( token, publicKey )
console.log("encrypted secret key by the senders public key: ",encryptedText) // This will print out the ENCRYPTED text
 
// --- Decrypt using private key ---
let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey)
console.log("decrypted secret key by the senders private key: ", decryptedText) // This will print out the DECRYPTED text

});







