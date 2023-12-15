import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Delete, PlayCircleFilled } from '@mui/icons-material';

function ManageVideos() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NODE_API}api/usersVideos`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePlayVideo = (videoUrl) => {
    // Implement video playback logic here
    window.open(videoUrl);
  };

  const handleDeleteVideo = async (userId, videoId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_NODE_API}api/usersVideos/${userId}/${videoId}`
      );
      fetchData();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Manage Videos</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Videos</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {user.videos.length === 0 ? (
                      <span>No videos</span>
                    ) : (
                      <ul>
                        {user.videos.map((video) => (
                          <li key={video.title}>
                            {video.title}
                            <IconButton
                              color="primary"
                              onClick={() => handlePlayVideo(video.video)}
                            >
                              <PlayCircleFilled />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                handleDeleteVideo(user.id, video.id)
                              }
                            >
                              <Delete />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ManageVideos;
