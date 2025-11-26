const Iklan = require('../models/iklanModel');

// GET semua iklan
const getAllIklan = async (req, res) => {
    try {
        const iklan = await Iklan.getAll();
        res.json(iklan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal mengambil data iklan' });
    }
};

// GET iklan By ID
const getIklanById = async (req, res) => {
    try {
        const { id } = req.params;
        const iklan = await Iklan.getById(id);
        if (!iklan) return res.status(404).json({ message: 'Iklan tidak ditemukan' });
        res.json(iklan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal mengambil data iklan' });
    }
};

// CREATE iklan baru
const createIklan = async (req, res) => {
    try {
        const {
            brosur_id,
            nama,
            tentang,
            layanan,
            harga,
            kontak,
            alamat
        } = req.body;

        const layananArr = layanan ? JSON.parse(layanan) : null;
        const hargaArr = harga ? JSON.parse(harga) : null;
        const kontakArr = kontak ? JSON.parse(kontak) : null;
        const alamatArr = alamat ? JSON.parse(alamat) : null;

        const galeri = req.files ? req.files.map(file => file.filename) : null;

        const newIklan = await Iklan.create({
            brosur_id,
            nama,
            tentang,
            layanan: layananArr,
            harga: hargaArr,
            kontak: kontakArr,
            alamat: alamatArr,
            galeri
        });

        res.status(201).json(newIklan);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal membuat iklan' });
    }
};

// UPDATE iklan
const updateIklan = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            brosur_id,
            nama,
            tentang,
            layanan,
            harga,
            kontak,
            alamat
        } = req.body;

        const layananArr = layanan ? JSON.parse(layanan) : null;
        const hargaArr = harga ? JSON.parse(harga) : null;
        const kontakArr = kontak ? JSON.parse(kontak) : null;
        const alamatArr = alamat ? JSON.parse(alamat) : null;

        // Ambil banyak files
        const galeri = req.files ? req.files.map(file => file.filename) : null;

        const updated = await Iklan.update(id, {
            brosur_id,
            nama,
            tentang,
            layanan: layananArr,
            harga: hargaArr,
            kontak: kontakArr,
            alamat: alamatArr,
            galeri
        });

        if (!updated) return res.status(404).json({ message: 'Iklan tidak ditemukan' });

        res.json(updated);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal update iklan' });
    }
};

// DELETE iklan
const deleteIklan = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Iklan.delete(id);

        if (!deleted) return res.status(404).json({ message: 'Iklan tidak ditemukan' });

        res.json(deleted);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal hapus iklan' });
    }
};

module.exports = {
    getAllIklan,
    getIklanById,
    createIklan,
    updateIklan,
    deleteIklan
};
