const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const multerStorageCloudinary = require('multer-storage-cloudinary').default;
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
// const io = socketIo(server);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Configure Multer with Cloudinary as storage
const storage = multerStorageCloudinary({
  cloudinary: cloudinary,
  folder: 'chat-uploads',
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb+srv://abdullah:abdullah@cluster0.msq76qh.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chatSchema = new mongoose.Schema({
  text: String,
  userId: String,
  userName: String,
  timestamp: Date,
});

const ChatMessage = mongoose.model('ChatMessage', chatSchema);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', async (message) => {
    // Store the message in MongoDB
    const chatMessage = new ChatMessage({
      text: message.text,
      userId: message.user.id,
      userName: message.user.name,
      timestamp: new Date(),
    });
  
    try {
      await chatMessage.save();
    } catch (err) {
      console.error('Error saving chat message to MongoDB', err);
    }
  
    io.emit('chat message', message);
  });

  socket.on('file upload', async (fileData) => {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(fileData.url);
      const fileMessage = {
        text: `File shared: ${cloudinaryResponse.url}`,
        user: fileData.user,
      };
  
      // Store the file message in MongoDB
      const chatMessage = new ChatMessage({
        text: fileMessage.text,
        userId: fileMessage.user.id,
        userName: fileMessage.user.name,
        timestamp: new Date(),
      });
  
      try {
        await chatMessage.save();
      } catch (err) {
        console.error('Error saving file message to MongoDB', err);
      }
  
      io.emit('chat message', fileMessage);
    } catch (error) {
      console.error('Error uploading file to Cloudinary', error);
    }
  });
});

app.get('/chat-history', async (req, res) => {
  try {
    // Retrieve chat history for a specific user (replace 'userId' with the actual user ID)
    const chatHistory = await ChatMessage.find({ userId: 'userId' }).exec();

    res.json(chatHistory);
  } catch (error) {
    console.error('Error retrieving chat history', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(5001, () => {
  console.log('Server is running on port 5001');
});


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const multerStorageCloudinary = require('multer-storage-cloudinary').default;
// const mongoose = require('mongoose');
// const path = require('path');
// const fs = require('fs');

// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());
// const server = http.createServer(app);
// // const io = socketIo(server);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });


// // Initialize Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// // Configure Multer with Cloudinary as storage
// const storage = multerStorageCloudinary({
//   cloudinary: cloudinary,
//   folder: 'chat-uploads',
//   allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
// });

// const upload = multer({ storage: storage });

// // MongoDB connection
// mongoose.connect('mongodb+srv://abdullah:abdullah@cluster0.msq76qh.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const chatSchema = new mongoose.Schema({
//   text: String,
//   userId: String,
//   userName: String,
//   timestamp: Date,
//   isImage: Boolean,
//   imageUrl: String,
//   isDocument: Boolean,
//   documentUrl: String,
// });

// const ChatMessage = mongoose.model('ChatMessage', chatSchema);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });

//   socket.on('join', (room) => {
//     socket.join(room);
//   });

//   socket.on('chat message', async (message) => {
//     // Store the message in MongoDB
//     const chatMessage = new ChatMessage({
//       text: message.text,
//       userId: message.user.id,
//       userName: message.user.name,
//       timestamp: new Date(),
//     });
  
//     // Check if the message contains an image
//     if (message.imageData) {
//       const imageResponse = await cloudinary.uploader.upload(message.imageData, {
//         folder: 'chat-uploads/images',
//       });
//       chatMessage.isImage = true;
//       chatMessage.imageUrl = imageResponse.url;
//     }
  
//     // Check if the message contains a document
//     if (message.documentData) {
//       const documentResponse = await cloudinary.uploader.upload(message.documentData, {
//         folder: 'chat-uploads/documents',
//       });
//       chatMessage.isDocument = true;
//       chatMessage.documentUrl = documentResponse.url;
//     }
  
//     try {
//       await chatMessage.save(); // Use await to wait for the save operation
//     } catch (error) {
//       console.error('Error saving chat message to MongoDB', error);
//     }
  
//     // Send the message to the room
//     io.to(message.user.id).emit('chat message', chatMessage);
  
//     // Send the message to all other connected users
//     socket.to(message.user.id).emit('chat message', chatMessage);
//   });
  

//   socket.on('file upload', async (fileData) => {
//     try {
//       const cloudinaryResponse = await cloudinary.uploader.upload(fileData.url, {
//         folder: 'chat-uploads',
//       });
//       const fileMessage = {
//         text: `File shared: ${cloudinaryResponse.url}`,
//         user: fileData.user,
//       };

//       // Store the file message in MongoDB
//       const chatMessage = new ChatMessage({
//         text: fileMessage.text,
//         userId: fileMessage.user.id,
//         userName: fileMessage.user.name,
//         timestamp: new Date(),
//         isDocument: true,
//         documentUrl: cloudinaryResponse.url,
//       });

//       chatMessage.save((err) => {
//         if (err) {
//           console.error('Error saving file message to MongoDB', err);
//         }
//       });

//       io.to(fileData.user.id).emit('chat message', chatMessage);
//     } catch (error) {
//       console.error('Error uploading file to Cloudinary', error);
//     }
//   });

//   // Serve files for download
//   app.get('/download/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const fileStream = cloudinary.uploader.download(filename);

//     fileStream.on('data', (chunk) => {
//       res.write(chunk);
//     });

//     fileStream.on('end', () => {
//       res.end();
//     });

//     fileStream.on('error', (error) => {
//       console.error('Error downloading file from Cloudinary', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
//   });
// });

// // Endpoint to retrieve chat history for a user
// app.get('/chat-history', async (req, res) => {
//   try {
//     // Retrieve chat history for a specific user (replace 'userId' with the actual user ID)
//     const chatHistory = await ChatMessage.find({ userId: 'userId' }).exec();

//     res.json(chatHistory);
//   } catch (error) {
//     console.error('Error retrieving chat history', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// server.listen(5001, () => {
//   console.log('Server is running on port 5001');
// });

