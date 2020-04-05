require('rootpath')();
var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        var dir = './aadharFiles/';
                mkdirp(dir, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    // move cb to here
                    cb(null, dir);
                    //cb(null, os.tmpdir());
                });
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);            
            }
  });

var upload = multer({ storage: storage})

router.post('/upload', upload.array("file"), fileUpload);

router.get('/download/:fileName', function (req, res, next) {
    console.log("Download file")
    filepath = path.join(__dirname, "../aadharFiles") + "/" + req.params.fileName;
    res.sendFile(filepath);
});

function fileUpload(req, res) {
    res.status(200).send({data:"File Uploaded"});
}

module.exports = router;