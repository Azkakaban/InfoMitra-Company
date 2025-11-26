const Brosur = require('../models/brosurModel');

// GET all brosur
const getAllBrosur = async (req, res) => {
    const brosur = await Brosur.getAll();
    res.json(brosur);
};

// GET by ID
const getBrosurById = async (req, res) => {
    const { id } = req.params;
    const brosur = await Brosur.getById(id);
    res.json(brosur);
};

// CREATE brosur
const createBrosur = async (req, res) => {
    const { nama, kategori } = req.body;
    const gambar = req.file ? req.file.path : null;
    const link = `/iklan/${nama.toLowerCase().replace(/\s/g,'-')}`;

    const newBrosur = await Brosur.create({ nama, kategori, gambar, link });
    res.status(201).json(newBrosur);
};

// UPDATE brosur
const updateBrosur = async (req, res) => {
    const { id } = req.params;
    const { nama, kategori } = req.body;
    const gambar = req.file ? req.file.path : null;
    const link = `/iklan/${nama.toLowerCase().replace(/\s/g,'-')}`;

    const updated = await Brosur.update(id, { nama, kategori, gambar, link });
    res.json(updated);
};

// DELETE brosur
const deleteBrosur = async (req, res) => {
    const { id } = req.params;
    const deleted = await Brosur.delete(id);
    res.json(deleted);
};

module.exports = { getAllBrosur, getBrosurById, createBrosur, updateBrosur, deleteBrosur };
