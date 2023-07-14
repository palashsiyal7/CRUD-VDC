const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const Room = require("./models/Room");
const Organization = require('./models/Organization');

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
app.post('/api/rooms', async (req, res) => {
    const { roomNo, organizationId } = req.body;
  
    try {
      const organization = await Organization.findById(organizationId);
      
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      const room = await Room.create({
        roomNo,
        organization: organization._id,
      });
  
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
//Get Api
app.get("/api/rooms/:id", async(req,res)=>{
    const { id } = req.params;

    try {
        const room = await Room.findById(id).populate('organization');

    if (!room) {
    return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}
});


//Update Api
app.put('/api/rooms/:id', async (req, res) => {
    const { id } = req.params;
    const roomData = req.body;

    try {
    const room = await Room.findByIdAndUpdate(id, roomData, {
        new: true,
    }).populate('organization');

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/rooms/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const room = await Room.findByIdAndDelete(id);

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(8000,()=>{
    console.log("running on localhost:8000")
})

