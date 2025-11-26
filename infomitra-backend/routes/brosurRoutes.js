const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllBrosur, getBrosurById, createBrosur, updateBrosur, deleteBrosur } = require('../controllers/brosurController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


router.get('/', getAllBrosur);
router.get('/:id', getBrosurById);
router.post('/', authMiddleware(['admin']), upload.single('gambar'), createBrosur);
router.put('/:id', authMiddleware(['admin']), upload.single('gambar'), updateBrosur);
router.delete('/:id', authMiddleware(['admin']), deleteBrosur);

module.exports = router;
