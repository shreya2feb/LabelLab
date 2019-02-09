const express = require('express');
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/listUsers', function (req, res) {
   console.log("req.body")
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://127.0.0.1:%s", port)
})