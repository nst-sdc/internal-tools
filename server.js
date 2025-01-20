import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB connection with mongoose
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectsDb';

// Define schema with type and data fields
const SubmissionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true,
  strict: false // Allows for flexible document structure
});

const Submission = mongoose.model('Submission', SubmissionSchema);

// Connect to MongoDB
async function connectToDb() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

// API route to save data with type parameter
app.post('/api/submit/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const submission = new Submission({
      type,
      data: req.body
    });
    const savedSubmission = await submission.save();
    res.json({ success: true, id: savedSubmission._id });
  } catch (err) {
    console.error('Failed to save submission:', err);
    res.status(500).json({ success: false, error: 'Failed to save submission' });
  }
});

// Serve index.html for all other routes to support SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function startServer() {
  await connectToDb();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);


