const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();


const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './upload')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/listUsers', upload.array('photo', 1), (req, res, next) => {
  console.log('file', req.file)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
  })
})


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://127.0.0.1:%s", port)
})