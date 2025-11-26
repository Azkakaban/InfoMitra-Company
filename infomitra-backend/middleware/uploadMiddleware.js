const multer = require('multer');
const path = require('path');

// tempat penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// filter file gambar
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if(allowedTypes.test(ext)){
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diizinkan'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
