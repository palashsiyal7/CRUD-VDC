const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const Room = require("./models/Room")
const Camera = require('./models/Camera')

const mongoUrl = "mongodb+srv://palash:fullstack07@cluster0.z2phwnb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Failed to connect to MongoDB", error)
})

// POST API to create a new room
app.post('/api/cameras', async (req, res) => {
    const cameraData = req.body;

    try {
      // Check if the specified roomId exists
    const room = await Room.findById(cameraData.roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const camera = await Camera.create(cameraData);
    res.status(201).json(camera);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

//Get API
app.get('/api/cameras/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const camera = await Camera.findById(id).populate('roomId');
    if (!camera) {
        return res.status(404).json({ message: 'Camera not found' });
    }
    res.json(camera);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

//UPDATE API
app.put('/api/cameras/:id', async (req, res) => {
    const { id } = req.params;
    const cameraData = req.body;

    try {
    const room = await Room.findById(cameraData.roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const camera = await Camera.findByIdAndUpdate(id, cameraData, {
        new: true,
    }).populate('roomId');

    if (!camera) {
        return res.status(404).json({ message: 'Camera not found' });
    }

    res.json(camera);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

//Delete Api
app.delete('/api/cameras/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const camera = await Camera.findByIdAndDelete(id);

    if (!camera) {
        return res.status(404).json({ message: 'Camera not found' });
    }

    res.json({ message: 'Camera deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(8000,()=>{
    console.log("running on localhost:8000")
})

