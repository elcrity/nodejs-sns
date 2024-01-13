const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { afterUploadImage, uploadPost } = require('../controllers/post');

const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
    //해당 폴더에 있는 파일 읽어옴
    fs.readdirSync('uploads');
} catch (err) {
    console.error('upload 폴더가 없음');
    fs.mkdirSync('uploads');
}

const upload =  multer({
    //storage속성에 어디(destination)에 어떤 이름으로(filename)
    storage : multer.diskStorage({
        destination(req,res,cb){
            cb(null, 'uploads/');
        },
        filename(req,file,cb){
            //확장자
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
     limits : {fileSize: 5 * 1024 * 1024 }
})

//POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
//POST /post
//이미지 데이터가 없으므로 none();
router.post('/', isLoggedIn, upload2.none(), uploadPost);
console.log(upload2);

module.exports = router;