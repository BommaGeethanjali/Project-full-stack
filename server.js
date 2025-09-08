const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://geethanjalibomma950_db_user:kWQUy9Skno9bZhKW@clusterresume-builder.tkqwx7z.mongodb.net/Resume-Builder?retryWrites=true&w=majority&appName=ClusterResume-Builder', {
  }).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

// ✅ Define Resume Schema & Model
const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: [String],
  education: [String]
});

const Resume = mongoose.model('Resume', resumeSchema);

// ✅ Resume creation route (👇 add here)
console.log("📌 Registering /api/resumes/create route...");

app.post('/api/resumes/create', async (req, res) => {
  try {
    const resumeData = req.body;
    const newResume = new Resume(resumeData);
    await newResume.save();

    res.send({
      message: 'Resume created successfully!',
      resume: newResume
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create resume' });
  }
});
// List all resumes (browser-friendly GET)
app.get('/api/resumes', async (req, res) => {
  try {
    const all = await Resume.find();
    res.json(all);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// ✅ Start server (keep this at the bottom)
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
