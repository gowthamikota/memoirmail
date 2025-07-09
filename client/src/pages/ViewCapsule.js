import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Zoom
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';

const ViewCapsule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    deliveryDate: new Date(),
  });

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get(`/api/capsules/${id}`, config);
        setCapsule(res.data);
        setFormData({
          title: res.data.title,
          message: res.data.message,
          deliveryDate: new Date(res.data.deliveryDate),
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || 'An error occurred');
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deliveryDate: date });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.put(`/api/capsules/${id}`, formData, config);
      setCapsule({ ...capsule, ...formData });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.delete(`/api/capsules/${id}`, config);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!capsule) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Alert severity="error">Time capsule not found</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#0a0a0a',
        py: 8,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <Fade in timeout={1000}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 900,
            background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0a0a0a 100%)',
            borderRadius: '12px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.1)',
            p: 4,
            zIndex: 1,
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #333333, #888888, #333333)',
            }
          }}
        >
          {/* Metal rivets */}
          {[{ top: '10px', left: '10px' }, { top: '10px', right: '10px' }, { bottom: '10px', left: '10px' }, { bottom: '10px', right: '10px' }].map((pos, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                ...pos,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #888888 0%, #555555 100%)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
              }}
            />
          ))}

          {error && (
            <Zoom in>
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </Zoom>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            {isEditing ? (
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                sx={{ input: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
              />
            ) : (
              <Typography variant="h4" component="h1">
                {capsule.title}
              </Typography>
            )}
            <Box>
              {isEditing ? (
                <>
                  <IconButton color="primary" onClick={handleSave}>
                    <Save />
                  </IconButton>
                  <IconButton onClick={() => setIsEditing(false)}>
                    <Cancel />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton color="primary" onClick={() => setIsEditing(true)} disabled={capsule.isDelivered}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => setDeleteDialogOpen(true)} disabled={capsule.isDelivered}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  sx={{ textarea: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
                />
              ) : (
                <Typography variant="body1" paragraph>
                  {capsule.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                  Delivery Date:
                </Typography>
                {isEditing ? (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={formData.deliveryDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ input: { color: '#ffffff' }, label: { color: '#aaaaaa' } }} />
                      )}
                    />
                  </LocalizationProvider>
                ) : (
                  <Typography>
                    {format(new Date(capsule.deliveryDate), 'PPP')}
                  </Typography>
                )}
              </Box>
            </Grid>

            {capsule.media && capsule.media.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Media
                </Typography>
                <Grid container spacing={2}>
                  {capsule.media.map((url, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          background: 'rgba(255,255,255,0.05)'
                        }}
                      >
                        <img
                          src={url}
                          alt={`Media ${index + 1}`}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain'
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Fade>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Time Capsule</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this time capsule? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewCapsule;
