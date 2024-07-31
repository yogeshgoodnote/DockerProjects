// backend/routes/fees.js
const express = require('express');
const router = express.Router();

let fees = [];

router.get('/', (req, res) => {
    res.json(fees);
});

router.post('/', (req, res) => {
    const fee = req.body;
    fees.push(fee);
    res.status(201).json(fee);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    fees = fees.filter(fee => fee.id !== id);
    res.status(204).send();
});

module.exports = router;
