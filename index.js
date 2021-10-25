const urlExists = require('./url-exists');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.get('/', function(req, res){
res.send('Search for a file here.');
});
app.post('/api/add', function(req, res){
    urlExists('https://mundocdn.herokuapp.com/files/' + req.query.name)
  .then(() => {
res.sendStatus(400);
    })
  .catch(() => {
    var h = req.files;
    var file_buffer=h.fileUploaded.data;
 app.get('/files/' + req.query.name, function(req, res){
 res.send(file_buffer);
 });
 });
 res.send({success: true, url: '/files/' + req.query.name});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
