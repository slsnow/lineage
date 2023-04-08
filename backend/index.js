// index.js
const express = require('express');
const peopleRouter = require('./people');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Add this line to enable parsing of JSON request bodies
app.use('/people', peopleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});