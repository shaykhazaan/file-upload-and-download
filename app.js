const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const express = require('express');
const mongoose = require('mongoose');

const Upload = require('./models/upload');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + '-' + file.originalname)
    }}
);

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){

        cb(null, true);
    }else {

        cb(null, false);
    }
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'));


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'./', 'views', 'form-upload.html'));
    //res.send('<h2>This is a form example </h2>');
});

app.post('/', (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const image = req.file;
    const imageUrl = image.path;
    
    const upload = new Upload({
            fileName: name,
            description: desc,
            imageUrl: imageUrl
        });
    upload
    .save()
    .then(result =>{

        res.redirect('/');
    }
    )
    .catch(err => {
        console.log(err);
    });
    console.log(image);
   
});


mongoose.connect(
    'mongodb+srv://dbUser:dbUser@cluster0.phflj.mongodb.net/imgupload?retryWrites=true', { useNewUrlParser: true }
    ).then(
        
        app.listen(3000, console.log('Server running on port 3000'))
  )
  .catch(
    err => {
        console.log(err);
    }
  );