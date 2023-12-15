import React, { useState, useEffect } from 'react';
import { Container, Snackbar, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar'; // Import your Navbar component

const API_URL = `${import.meta.env.VITE_NODE_API}`; // Replace with your actual API URL

const Home = ({ user, testResult, handleTestSubmit }) => (
  <div>
    <h1>Welcome to the Skill Check Test</h1>
    {user && testResult !== 'pass' ? (
      <div>
        <h2>Please attempt the test</h2>
        <button onClick={handleTestSubmit}>Attempt Test</button>
      </div>
    ) : null}
  </div>
);

const UploadVideo = ({ testResult }) => (
  <div>
    {testResult === 'pass' ? (
      <div>
        <h1>Welcome to the Creator Community</h1>
        <p>You are allowed to upload videos.</p>
      </div>
    ) : (
      <h1>Sorry, you are not allowed to upload videos. Please attempt the test.</h1>
    )}
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [attempts, setAttempts] = useState(2);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Load user data from local storage on app load
   
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    const storedUser = storedAuth?.user;
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Check user's test result from the database
      axios
        .get(`${API_URL}api/usertest/${user._id}/testResult`)
        .then((response) => {
          setTestResult(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  const mcqs = [
    {
      question: "What does the term 'timeline' refer to in video editing?",
      options: [
        "A graphical representation of video duration",
        "A list of video clips in a project",
        "A video playback control",
        "A type of video transition",
      ],
      correctAnswer: 0, // Index of the correct answer in the options array
    },
    // Add more MCQs following the same format
  ];
  
  const handleTestSubmit = () => {
    // Simulate test scoring for demonstration
    const simulatedScore = calculateTestScore(); // Implement the scoring logic

    if (simulatedScore >= 80 && attempts > 0) {
      // Update user data with the test result
      axios
        .put(`${API_URL}api/usertest/${user._id}`, {
          testResult: 'pass',
          attempts: attempts - 1,
        })
        .then(() => {
          setTestResult('pass');
          setSnackbarMessage(
            'Congratulations! You passed the test and can now upload videos.'
          );
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (attempts > 0) {
      // Update user data with the test result
      axios
        .put(`${API_URL}api/usertest/${user._id}`, {
          testResult: 'fail',
          attempts: attempts - 1,
        })
        .then(() => {
          setTestResult('fail');
          setSnackbarMessage(
            'Sorry, you did not pass the test. Please try again after 30 minutes.'
          );
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSnackbarMessage('You have used all your attempts.');
      setSnackbarOpen(true);
    }
  };

  // Simulated MCQs and correct answers
  const calculateTestScore = () => {
    let correctAnswersCount = 0;

    // For demonstration, assume selected answers
    const selectedAnswers = [0, 0]; // Replace with actual selected answers

    // Loop through each question and check if the selected answer is correct
    for (let i = 0; i < mcqs.length; i++) {
      if (selectedAnswers[i] === mcqs[i].correctAnswer) {
        correctAnswersCount++;
      }
    }

    // Calculate the percentage score
    const percentageScore = (correctAnswersCount / mcqs.length) * 100;
    return percentageScore;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      {/* Use your existing Navbar component */}
      <Navbar />

      <Container>
        <Routes>
          <Route path="/" element={<Home user={user} testResult={testResult} handleTestSubmit={handleTestSubmit} />} />
          <Route path="/upload-video" element={<UploadVideo testResult={testResult} />} />
        </Routes>
      </Container>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default App;
