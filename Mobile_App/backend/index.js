/*jshint esversion: 6 */

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();


const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './upload');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: Storage});
const time_now = Date.now();

const respose_filename = "photo_"+time_now;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/upload', upload.array('photo', 1), (req, res, next) => {
  console.log('file', req.file);
  console.log('body', req.body);
  res.status(200).json({
    message: respose_filename,
  });
});


var server = app.listen(process.env.PORT || 3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://127.0.0.1:%s", port);
});