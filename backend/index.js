require('dotenv').config();

const express = require('express');
const peopleRouter = require('./people');

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/people', peopleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
