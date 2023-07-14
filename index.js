const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const Organization = require('./models/Organization')
const Room = require("./models/Room")

const mongoUrl = "mongodb+srv://palash:fullstack07@cluster0.z2phwnb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Failed to connect to MongoDB", error)
})

app.post("/api/organizations", async(req,res)=>{
    const organizationData = req.body;

    try {
        const organization = await Organization.create(organizationData)
        res.status(201).json(organization)
    } catch (error) {
        res.status(500).json({ message:"Internal server error" })
    }
})

app.get('/api/organizations/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const organization = await Organization.findById(id);
    if (!organization) {
    return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

// Update API
app.put('/api/organizations/:id', async (req, res) => {
    const { id } = req.params;
    const organizationData = req.body;

    try {
    const organization = await Organization.findByIdAndUpdate(id, organizationData, {
    new: true,
    });

    if (!organization) {
    return res.status(404).json({ message: 'Organization not found' });
    }

    res.json(organization);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE API to delete an existing organization
app.delete('/api/organizations/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const organization = await Organization.findByIdAndDelete(id);

    if (!organization) {
    return res.status(404).json({ message: 'Organization not found' });
    }

    res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(8000,()=>{
    console.log("running on localhost:8000")
})
