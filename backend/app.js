// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const feesRoutes = require('./routes/fees');
const studentsRoutes = require('./routes/students');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/fees', feesRoutes);
app.use('/api/students', studentsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
