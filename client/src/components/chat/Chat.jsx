import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Input, Paper } from "@mui/material";
import { io } from "socket.io-client";
import Navbar from "../Navbar";
import { Box } from "@mui/system";
import { useLocation } from "react-router";

const socket = io("http://localhost:5001"); // Replace with your server URL

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState(""); // Get the username from localStorage
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    const userId = storedAuth?.user?._id;
    const userName = storedAuth?.user?.name;
    setUsername({ id: userId, name: userName });

    // Retrieve chat history from your backend
    fetch("http://localhost:5001/chat-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching chat history", error);
      });

    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        text: messageInput,
        user: username,
      };
      socket.emit("chat message", newMessage);
      setMessageInput("");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSendFile = async () => {
    if (selectedFile) {
      try {
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(
          selectedFile.path
        );
        const fileMessage = {
          text: `File shared: ${cloudinaryResponse.url}`,
          user: username,
        };
        socket.emit("chat message", fileMessage);
      } catch (error) {
        console.error("Error uploading file to Cloudinary", error);
      }
    }
  };

  return (
    <Box>
      <Navbar />
      <Container sx={{ backgroundColor: "white" }} maxWidth="md">
        <h1 style={{ marginTop: "20px", fontSize: "30px", color: "black" }}>
          Chat Window
        </h1>
        <div
          style={{
            minHeight: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "20px",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <Paper
              key={index}
              style={{
                padding: "10px",
                marginBottom: "10px",
                maxWidth: "80%",
                marginLeft: message.user.id === username.id ? "auto" : "10px",
                backgroundColor:
                  message.user.id === username.id ? "#4CAF50" : "#2196F3",
                color: "white",
                borderRadius: "5px",
              }}
            >
              <strong>{message.user.name}:</strong> {message.text}
            </Paper>
          ))}
        </div>
        <TextField
          label="Message"
          variant="outlined"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          fullWidth
          style={{ color: "white", backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Send
        </Button>
        {/* <Input
        type="file"
        onChange={handleFileChange}
        accept="image/*, .pdf, .doc, .docx" // Add appropriate file types
        style={{ marginLeft: '10px', marginTop: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSendFile} style={{ marginLeft: '10px', marginTop: '10px' }}>
        Send File
      </Button> */}
      </Container>
    </Box>
  );
}

// import React, { useEffect, useState, useRef } from 'react';
// import { Button, Container, TextField, Input, Paper, IconButton } from '@mui/material';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5001'); // Replace with your server URL

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [username, setUsername] = useState({}); // Get the username from localStorage
//   const [selectedFile, setSelectedFile] = useState(null);

//   const chatContainerRef = useRef(null); // Initialize with useRef

//   useEffect(() => {
//     const storedAuth = JSON.parse(localStorage.getItem('auth'));
//     const userId = storedAuth?.user?._id;
//     const userName = storedAuth?.user?.name;

//     setUsername({ id: userId, name: userName });

//     console.log(userId);
//     if (userId && userName) {

//       // Retrieve chat history from your backend when the component mounts
//       fetch('http://localhost:5001/chat-history', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setMessages(data);
//           // Scroll to the latest message
//           chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
//         })
//         .catch((error) => {
//           console.error('Error fetching chat history', error);
//         });
//     }

//     socket.on('connect', () => {
//       if (userId) {
//         // Join a room using the user's ID as the room name
//         socket.emit('join', userId);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });

//     socket.on('chat message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       console.log(message);
//       // Scroll to the latest message
//       chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
//     });
//   }, []);
//   const handleSendMessage = () => {
//     if (messageInput.trim() !== '') {
//       const newMessage = {
//         text: messageInput,
//         user: username,
//       };
//       socket.emit('chat message', newMessage);
//       setMessageInput('');
//     }
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSendFile = async () => {
//     if (selectedFile) {
//       try {
//         const formData = new FormData();
//         formData.append('file', selectedFile);

//         // Upload the file to the server
//         const response = await fetch('http://localhost:5001/upload-file', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const fileMessage = {
//             text: `File shared: ${selectedFile.name}`,
//             user: username,
//           };
//           socket.emit('chat message', fileMessage);
//           setSelectedFile(null);
//           alert('File sent successfully!');
//         } else {
//           alert('File upload failed.');
//         }
//       } catch (error) {
//         console.error('Error uploading file', error);
//         alert('File upload failed.');
//       }
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <h1>Chat App</h1>
//       <div
//         style={{
//           minHeight: '300px',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           padding: '10px',
//           marginBottom: '20px',
//           overflowY: 'auto',
//         }}
//         ref={chatContainerRef}
//       >
//         {messages.map((message, index) => (
//           <Paper
//             key={index}
//             style={{
//               padding: '10px',
//               marginBottom: '10px',
//               maxWidth: '80%',
//               marginLeft: message.userId === username?.id ? 'auto' : '10px', // Check if username is defined
//               backgroundColor: message.userId === username?.id ? '#4CAF50' : '#2196F3', // Check if username is defined
//               color: 'white',
//               borderRadius: '5px',
//             }}
//           >
//             <strong>{message.userName}:</strong> {message.text}
//             {message.isImage && (
//               <img
//                 src={message.imageUrl}
//                 alt="Attached"
//                 style={{ maxWidth: '100%', marginTop: '10px' }}
//               />
//             )}
//             {message.isDocument && (
//               <IconButton
//                 onClick={() => window.open(message.documentUrl, '_blank')}
//                 style={{ marginTop: '10px', color: 'white' }}
//               >
//                 Download File
//               </IconButton>
//             )}
//           </Paper>
//         ))}
//       </div>
//       <TextField
//         label="Message"
//         variant="outlined"
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//         fullWidth
//       />
//       <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: '10px' }}>
//         Send
//       </Button>
//       <Input
//         type="file"
//         onChange={handleFileChange}
//         accept="image/*, .pdf, .doc, .docx" // Add appropriate file types
//         style={{ marginLeft: '10px', marginTop: '10px' }}
//       />
//       <Button variant="contained" color="primary" onClick={handleSendFile} style={{ marginLeft: '10px', marginTop: '10px' }}>
//         Send File
//       </Button>
//     </Container>
//   );
// }

export default Chat;
