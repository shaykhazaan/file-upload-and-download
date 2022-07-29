const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + file.originalname)
    }}
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage}).single('image'));


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'./', 'views', 'form-upload.html'));
    //res.send('<h2>This is a form example </h2>');
});

app.post('/', (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const fileURL = req.file;
    console.log(fileURL);
});

app.listen(3000, console.log('Server running on port 3000'))
