const express = require('express');
const router = express.Router();
const { getAllIklan, getIklanById, createIklan, updateIklan, deleteIklan } = require('../controllers/iklanController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


router.get('/', getAllIklan);
router.get('/:id', getIklanById);

router.post('/', authMiddleware(['admin']), upload.array('galeri', 10), createIklan);
router.put('/:id', authMiddleware(['admin']), upload.array('galeri', 10), updateIklan);
router.delete('/:id', authMiddleware(['admin']), deleteIklan);

module.exports = router;
