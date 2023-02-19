const multerS3 = require('multer-s3');
const multer = require('multer'); 
const path = require('path'); 

const s3 = require('../utils/s3.util'); 

const upload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {   
            const fileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
            cb(null, `${fileName}${path.extname(file.originalname)}`);
        }
    })
});

module.exports = upload;