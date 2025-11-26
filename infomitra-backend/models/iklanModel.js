const pool = require('../config/db');

const Iklan = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM iklan ORDER BY id DESC');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM iklan WHERE id=$1', [id]);
        return result.rows[0];
    },

    create: async ({ brosur_id, nama, tentang, layanan, harga, kontak, alamat, galeri }) => {
        const result = await pool.query(
            `INSERT INTO iklan (brosur_id, nama, tentang, layanan, harga, kontak, alamat, galeri)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [brosur_id, nama, tentang, layanan, harga, kontak, alamat, galeri]
        );
        return result.rows[0];
    },

    update: async (id, { brosur_id, nama, tentang, layanan, harga, kontak, alamat, galeri }) => {
        const result = await pool.query(
            `UPDATE iklan 
             SET brosur_id=$1, nama=$2, tentang=$3, layanan=$4, harga=$5, kontak=$6, alamat=$7, galeri=$8
             WHERE id=$9 RETURNING *`,
            [brosur_id, nama, tentang, layanan, harga, kontak, alamat, galeri, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM iklan WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Iklan;
