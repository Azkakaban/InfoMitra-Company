const pool = require('../config/db');

const Komentar = {
    getAll: async () => {
        const result = await pool.query(
            'SELECT k.id, k.komentar, k.user_id, u.nama AS username, k.created_at ' +
            'FROM komentar k JOIN users u ON k.user_id = u.id ' +
            'ORDER BY k.created_at DESC'
        );
        return result.rows;
    },

    getByUser: async (user_id) => {
        const result = await pool.query(
            'SELECT * FROM komentar WHERE user_id=$1 ORDER BY created_at DESC',
            [user_id]
        );
        return result.rows;
    },

    create: async ({ user_id, komentar }) => {
        const result = await pool.query(
            'INSERT INTO komentar (user_id, komentar) VALUES ($1, $2) RETURNING *',
            [user_id, komentar]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query(
            'DELETE FROM komentar WHERE id=$1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
};

module.exports = Komentar;
