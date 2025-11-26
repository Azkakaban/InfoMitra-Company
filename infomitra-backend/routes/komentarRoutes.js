const express = require('express');
const router = express.Router();
const { getAllKomentar, createKomentar, deleteKomentar } = require('../controllers/komentarController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllKomentar);
router.post('/', authMiddleware(['user','admin']), createKomentar);
router.delete('/:id', authMiddleware(['user','admin']), deleteKomentar);

module.exports = router;
