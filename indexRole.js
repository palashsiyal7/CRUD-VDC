const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const Role = require('./models/Role')

const mongoUrl = "mongodb+srv://palash:fullstack07@cluster0.z2phwnb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Failed to connect to MongoDB", error)
})

app.post('/api/roles', async (req, res) => {
    const roleData = req.body;

    try {
    const role = await Role.create(roleData);
    res.status(201).json(role);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/roles/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const role = await Role.findById(id);

    if (!role) {
        return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/roles/:id', async (req, res) => {
    const { id } = req.params;
    const roleData = req.body;

    try {
    const role = await Role.findByIdAndUpdate(id, roleData, {
        new: true,
    });

    if (!role) {
        return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/roles/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const role = await Role.findByIdAndDelete(id);

    if (!role) {
        return res.status(404).json({ message: 'Role not found' });
    }

    res.json({ message: 'Role deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(8000,()=>{
    console.log("running on localhost:8000")
})

