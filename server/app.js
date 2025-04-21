const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express App
const app = express();
const PORT = 5000;

const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Default route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection mongodb+srv://ani:Atharvital123@clusterani.r8dajhu.mongodb.net/
mongoose.connect('mongodb+srv://ani:Atharvital1234@clusterani.r8dajhu.mongodb.net/studentDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Student Schema
const studentSchema = new mongoose.Schema({
    Roll_No: { type: String, required: true },
    Name_students: { type: String, required: true },
    Age: { type: Number, required: true },
    Studing_year: { type: String, required: true },
    Course: { type: String, required: true },
    Mobile_no: { type: String, default: null },
    Address: { type: String, default: null },
});

// Create Student Model
const Student = mongoose.model('Student', studentSchema);

// API Endpoints

// Get All Students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a New Student
app.post('/students', async (req, res) => {
    const student = new Student({
        Roll_No: req.body.Roll_No,
        Name_students: req.body.Name_students,
        Age: req.body.Age,
        Studing_year: req.body.Studing_year,
        Course: req.body.Course,
        Mobile_no: req.body.Mobile_no,
        Address: req.body.Address,
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Student
app.put('/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a Student
app.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




//pack
// "scripts": {
//    "start": "node server/app.js"
//},