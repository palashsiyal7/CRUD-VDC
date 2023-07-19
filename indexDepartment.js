const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const Department = require('./models/Department')
const Branch = require("./models/Branch")

const mongoUrl = "mongodb+srv://palash:fullstack07@cluster0.z2phwnb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Failed to connect to MongoDB", error)
})

app.post('/api/departments', async (req, res) => {
    const departmentData = req.body;

    try {
    const branch = await Branch.findById(departmentData.branch);
    if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
    }

    const department = await Department.create(departmentData);
    res.status(201).json(department);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/departments/:id', async(req,res)=>{
    try {
        const departments = await Department.findById(req.params.id).populate('branch')
        res.json(departments)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.put('/api/departments/:id', async (req, res) => {
    const { id } = req.params;
    const departmentData = req.body;

    try {
    const branch = await Branch.findById(departmentData.branch);
    if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
    }

    const department = await Department.findByIdAndUpdate(id, departmentData, {
        new: true,
    }).populate('branch');

    if (!department) {
        return res.status(404).json({ message: 'Department not found' });
    }

    res.json(department);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/departments/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const department = await Department.findByIdAndDelete(id);

    if (!department) {
        return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(8000,()=>{
    console.log("running on localhost:8000")
})
