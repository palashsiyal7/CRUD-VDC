const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const Branch = require('./models/Branch')

const mongoUrl = "mongodb+srv://palash:fullstack07@cluster0.z2phwnb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Failed to connect to MongoDB", error)
})

app.post('/api/branch', async (req, res) => {
    const branchData = req.body;

    try {
    const branch = await Branch.create(branchData);
    res.status(201).json(branch);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/branch/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const branch = await Branch.findById(id);

    if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
    }

    res.json(branch);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/branch/:id', async (req, res) => {
    const { id } = req.params;
    const branchData = req.body;

    try {
    const branch = await Branch.findByIdAndUpdate(id, branchData, {
        new: true,
    });

    if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
    }

    res.json(branch);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/branch/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const branch = await Branch.findByIdAndDelete(id);

    if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
    }

    res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(8000,()=>{
    console.log("running on localhost:8000")
})

