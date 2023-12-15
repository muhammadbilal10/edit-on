import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Grid,
} from '@mui/material';
import { Delete, Edit, Add, Close, PlayCircleFilled } from '@mui/icons-material';
import { DialogContentText } from '@mui/material'; // Import DialogContentText

function EditONAdmin() {
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('creator');
  const [editUser, setEditUser] = useState(null);
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    country: '',
    userType: 'creator',
  });
  const [isManageVideosTab, setIsManageVideosTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    userId: null,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response;

      if (isManageVideosTab) {
        response = await axios.get(`${import.meta.env.VITE_NODE_API}usersVideos`);
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_NODE_API}api/users?type=${selectedTab}`
        );
      }

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab, isManageVideosTab]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 'managevideos') {
      setIsManageVideosTab(true);
    } else {
      setIsManageVideosTab(false);
      setSelectedTab(newValue);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDeleteConfirmation = (userId) => {
    setDeleteConfirmation({ open: true, userId });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_NODE_API}api/users/${deleteConfirmation.userId}`);
      setDeleteConfirmation({ open: false, userId: null });
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_NODE_API}api/users/${editUser._id}`,
        editUser
      );
      setEditUser(null);
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_NODE_API}api/users`, newUser);
      setCreateUserDialogOpen(false);
      setNewUser({
        name: '',
        email: '',
        country: '',
        userType: 'creator',
      });
      fetchData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handlePlayVideo = (videoUrl) => {
    window.open(videoUrl);
  };

  const handleDeleteVideo = async (userId, videoId) => {console.log(userId, videoId)
    try {
      await axios.delete(
        `${import.meta.env.VITE_NODE_API}api/users/deleteVideos/${userId}/${videoId}`
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
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Tabs
          value={isManageVideosTab ? 'managevideos' : selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Creators" value="creator" />
          <Tab label="Clients" value="client" />
          <Tab label="Companies" value="company" />
          <Tab label="Manage Videos" value="managevideos" />
        </Tabs>
        <Grid container spacing={2}>
          {/* <Grid item>
            {!isManageVideosTab && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                onClick={() => setCreateUserDialogOpen(true)}
              >
                Create User
              </Button>
            )}
          </Grid> */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    {isManageVideosTab ? (
                      <TableCell>Videos</TableCell>
                    ) : (
                      <>
                        <TableCell>Email</TableCell>
                        <TableCell>Country</TableCell>
                      </>
                    )}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {isLoading ? (
  <TableRow>
    <TableCell colSpan={3}>Loading...</TableCell>
  </TableRow>
) : (
  users &&
  users.map((user) => (
    <TableRow key={isManageVideosTab ? user.id : user._id}>
      <TableCell>{user.name}</TableCell>
      {isManageVideosTab ? (
        <TableCell>
          {user.videos && user.videos.length > 0 ? (
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
          ) : (
            <span>No videos</span>
          )}
        </TableCell>
      ) : (
        <>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.country}</TableCell>
        </>
      )}
      <TableCell>
        <IconButton
          color="primary"
          onClick={() => handleEdit(user)}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDeleteConfirmation(user._id)}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))
)}


                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Dialog
          open={Boolean(editUser)}
          onClose={() => setEditUser(null)}
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {editUser && (
              <>
                <TextField
                  label="Name"
                  fullWidth
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
                {!isManageVideosTab && (
                  <>
                    <TextField
                      label="Email"
                      fullWidth
                      value={editUser.email}
                      onChange={(e) =>
                        setEditUser({ ...editUser, email: e.target.value })
                      }
                    />
                    <TextField
                      label="Country"
                      fullWidth
                      value={editUser.country}
                      onChange={(e) =>
                        setEditUser({ ...editUser, country: e.target.value })
                      }
                    />
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditUser(null)}>
              <Close /> Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {!isManageVideosTab && (
          <Dialog
            open={createUserDialogOpen}
            onClose={() => setCreateUserDialogOpen(false)}
          >
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                fullWidth
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <TextField
                label="Email"
                fullWidth
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <TextField
                label="Country"
                fullWidth
                value={newUser.country}
                onChange={(e) =>
                  setNewUser({ ...newUser, country: e.target.value })
                }
              />
              <FormControl>
                <RadioGroup
                  value={newUser.userType}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userType: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="creator"
                    control={<Radio />}
                    label="Creator"
                  />
                  <FormControlLabel
                    value="client"
                    control={<Radio />}
                    label="Client"
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio />}
                    label="Company"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCreateUserDialogOpen(false)}>
                <Close /> Cancel
              </Button>
              <Button onClick={handleCreateUser} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Dialog
          open={deleteConfirmation.open}
          onClose={() => setDeleteConfirmation({ open: false, userId: null })}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation({ open: false, userId: null })}>
              <Close /> Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default EditONAdmin;
