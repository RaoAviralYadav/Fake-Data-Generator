require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const generateDummyData = require('./utils/generateData');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const port = 3000
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  res.render('index', { output: null, selectedType: null, jsonOutput: null });
});



app.get('/generate', async (req, res) => {
  const type = req.query.type || 'employee';
  const count = parseInt(req.query.count) || 1;
  const format = req.query.format || 'table';

  try {
    const data = [];

    for (let i = 0; i < count; i++) {
      const item = await generateDummyData(type);
      data.push(item);
    }

    if (format === 'json') {
      res.render('index', { output: null, selectedType: type, jsonOutput: JSON.stringify(data, null, 2) });
    } else {
      res.render('index', { output: data, selectedType: type, jsonOutput: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating data.");
  }
});




app.get('/delete-all', async (req, res) => {
  const type = req.query.type;

  try {
    if (type === 'employee') {
      const Employee = require('./models/Employee');
      await Employee.deleteMany({});
    } else if (type === 'cat') {
      const Cat = require('./models/Cat');
      await Cat.deleteMany({});
    } else {
      return res.status(400).send("Invalid type");
    }

    res.send(`All ${type}s deleted.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data.");
  }
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
