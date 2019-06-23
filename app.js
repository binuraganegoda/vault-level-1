const express = require('express');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');
const zlib = require('zlib');
const crypto = require('crypto');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/encrypt', function (req, res) {
    const busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('Uploading: ');
        console.log(mimetype);

        if (checkExtension(filename)) {
            const cipher = crypto.createCipher('aes-256-cbc', 'mysecretkey');
            file.pipe(cipher).pipe(fs.createWriteStream('./temp/' + filename + '.enc'));
        } else {
            const zip = zlib.createGzip();
            const cipher = crypto.createCipher('aes-256-cbc', 'mysecretkey');
            file.pipe(zip).pipe(cipher).pipe(fs.createWriteStream('./temp/' + filename  + '.enc'));
        }
    });
    busboy.on('finish', function () {
        console.log('Upload complete');
        res.send('done');
    });
    return req.pipe(busboy);
});

app.post('/decrypt', function (req, res) {
    const busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('Uploading: ');
        console.log(mimetype);
        const unzip = zlib.createUnzip();
        const decipher = crypto.createDecipher('aes-256-cbc', 'mysecretkey');
        file.pipe(decipher).pipe(unzip).pipe(fs.createWriteStream('./temp/' + filename.split('.').slice(0, -1).join('.')));
    });
    busboy.on('finish', function () {
        console.log('Upload complete');
        res.send('done');
    });
    return req.pipe(busboy);

});

const checkExtension = (filename) => {
    switch (path.extname(filename)) {
        case '.zip':
            return true;
        case '.rar':
            return true;
        case '.7z':
            return true;
        case '.gzip':
            return true;
        case '.mp4':
            return true;
        default:
            return false;
    }
};

app.listen(3000, () => {
    console.log('App listening on port 3000');
});



