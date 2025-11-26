const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const brosurRoutes = require('./routes/brosurRoutes');
const iklanRoutes = require('./routes/iklanRoutes');
const komentarRoutes = require('./routes/komentarRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/brosur', brosurRoutes);
app.use('/api/iklan', iklanRoutes);
app.use('/api/komentar', komentarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
