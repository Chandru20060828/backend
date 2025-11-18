// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const progressRoutes = require('./routes/progressRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', progressRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
