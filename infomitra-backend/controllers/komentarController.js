const Komentar = require('../models/komentarModel');

// GET semua komentar
const getAllKomentar = async (req, res) => {
    const komentar = await Komentar.getAll();
    res.json(komentar);
};

// POST komentar baru
const createKomentar = async (req, res) => {
    const { komentar } = req.body;
    const user_id = req.user.id;

    const newKomentar = await Komentar.create({ user_id, komentar });
    res.status(201).json(newKomentar);
};

// DELETE komentar
const deleteKomentar = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    const role = req.user.role;

    const semuaKomentar = await Komentar.getAll();
    const target = semuaKomentar.find(k => k.id === parseInt(id));
    if(!target) return res.status(404).json({ message: 'Komentar tidak ditemukan' });

    if(target.user_id !== user_id && role !== 'admin')
        return res.status(403).json({ message: 'Tidak boleh hapus komentar orang lain' });

    const deleted = await Komentar.delete(id);
    res.json(deleted);
};

module.exports = { getAllKomentar, createKomentar, deleteKomentar };
