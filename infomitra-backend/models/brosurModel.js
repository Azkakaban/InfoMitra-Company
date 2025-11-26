const db = require('../config/db');

const Brosur = {
    getAll: async () => {
        const res = await db.query('SELECT * FROM brosur ORDER BY id ASC');
        return res.rows;
    },
    getById: async (id) => {
        const res = await db.query('SELECT * FROM brosur WHERE id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { nama, kategori, gambar, link } = data;
        const res = await db.query(
            'INSERT INTO brosur (nama, kategori, gambar, link) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama, kategori, gambar, link]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { nama, kategori, gambar, link } = data;
        const res = await db.query(
            'UPDATE brosur SET nama=$1, kategori=$2, gambar=$3, link=$4 WHERE id=$5 RETURNING *',
            [nama, kategori, gambar, link, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        await db.query('DELETE FROM brosur WHERE id=$1', [id]);
        return { message: 'Brosur deleted' };
    }
};

module.exports = Brosur;
