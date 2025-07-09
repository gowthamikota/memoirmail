import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  useMediaQuery,
  Paper,
  Fade,
  CircularProgress
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const CreateCapsule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    message: '',
    deliveryDate: new Date(),
    email: ''
  });
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const { title, subject, message, deliveryDate, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (date) => {
    setFormData({ ...formData, deliveryDate: date });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!title || !subject || !message || !deliveryDate || !email) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', title);
      formDataToSend.append('subject', subject);
      formDataToSend.append('message', message);
      formDataToSend.append('deliveryDate', deliveryDate.toISOString());
      formDataToSend.append('email', email);

      media.forEach((file) => {
        formDataToSend.append('media', file);
      });

      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post('/api/capsules', formDataToSend, config);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating capsule:', err);
      setError(err.response?.data?.msg || 'An error occurred while creating the time capsule');
    } finally {
      setLoading(false);
    }
  };

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(rgba(50,50,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(50,50,50,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Fade in timeout={1000}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            position: 'relative',
            background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0a0a0a 100%)',
            borderRadius: '12px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.1)',
            p: 4,
            zIndex: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #333333, #888888, #333333)',
            },
          }}
        >
          {[{ top: '10px', left: '10px' }, { top: '10px', right: '10px' }, { bottom: '10px', left: '10px' }, { bottom: '10px', right: '10px' }].map(
            (pos, i) => (
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
            )
          )}

          <Typography variant="h4" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold', textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Create Time Capsule
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={onSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  error={!title}
                  helperText={!title ? 'Title is required' : ''}
                  sx={{ input: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
                />
              </Grid>
           
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Recipient Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  error={!email}
                  helperText={!email ? 'Email is required' : ''}
                  sx={{ input: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
                />
              </Grid>
                 <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={subject}
                  onChange={onChange}
                  error={!subject}
                  helperText={!subject ? 'Subject is required' : ''}
                  sx={{ input: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  name="message"
                  value={message}
                  onChange={onChange}
                  error={!message}
                  helperText={!message ? 'Message is required' : ''}
                  sx={{ textarea: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
                />
              </Grid>
             
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Delivery Date & Time"
                    value={deliveryDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        error={!deliveryDate}
                        helperText={!deliveryDate ? 'Delivery date is required' : ''}
                        sx={{ input: { color: '#ffffff' }, label: { color: '#aaaaaa' } }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    color: '#ffffff',
                    borderColor: '#444444',
                    background: 'rgba(255,255,255,0.05)',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                    },
                    mb: 2,
                  }}
                >
                  Upload Media
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {previewUrls.length > 0 && (
                  <Grid container spacing={2}>
                    {previewUrls.map((url, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.05)',
                          }}
                        >
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '200px',
                              objectFit: 'contain',
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!title || !subject || !message || !deliveryDate || !email || loading}
                  sx={{
                    background: 'linear-gradient(45deg, #333333, #444444)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #444444, #555555)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Create Time Capsule'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Box>
  );
};

export default CreateCapsule;