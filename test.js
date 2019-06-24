const crypto = require('crypto');
const QuickEncrypt = require('quick-encrypt');
const fs = require('fs');
const temp = require('./keypair'); 
const key = temp.tempkey();
let enc = '';
let dec = '';

//let pair = temp.getRSAKeyPair();

// console.log(pair.public);
// console.log(pair.private);

console.log('random key : '+key);
encryptString();
decryptString();

function encryptString()
{
    let text = encryptRSA(key);
    console.log('encrypted  : '+text);
    enc=text;
}

function decryptString()
{
    let out = decryptRSA(enc);
    console.log('decrypted  : '+out);
    dec = out;
}

function encryptRSA(text)
{
    let publicKey = fs.readFileSync('public.pem','utf8');
    let encryptedText = QuickEncrypt.encrypt( text, publicKey );
    //console.log(encryptedText);
    return encryptedText;
}

function decryptRSA(encryptedText)
{
    let privateKey =  fs.readFileSync('private.pem','utf8');
    let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey);
    //console.log(decryptedText);
    return decryptedText;
}