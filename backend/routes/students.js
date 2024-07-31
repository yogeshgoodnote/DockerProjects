// backend/routes/students.js
const express = require('express');
const router = express.Router();

let students = [];

router.get('/', (req, res) => {
    res.json(students);
});

router.post('/', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).json(student);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    students = students.filter(student => student.id !== id);
    res.status(204).send();
});

module.exports = router;
