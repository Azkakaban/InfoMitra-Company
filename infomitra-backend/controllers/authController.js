const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// REGISTER user
const register = async (req, res) => {
    const { nama, email, password, role = 'user' } = req.body;

    // cek email sudah ada atau belum
    const existing = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if(existing.rows.length > 0) return res.status(400).json({ message: 'Email sudah digunakan' });

    const result = await pool.query(
        'INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, nama, email, role',
        [nama, email, password, role]
    );

    res.status(201).json(result.rows[0]);
};

// LOGIN user/admin
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email=$1 AND password=$2', [email, password]);
    if(user.rows.length === 0) return res.status(401).json({ message: 'Email atau password salah' });

    const payload = { id: user.rows[0].id, role: user.rows[0].role };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

    res.json({ token, user: { id: user.rows[0].id, nama: user.rows[0].nama, role: user.rows[0].role } });
};

module.exports = { register, login };
