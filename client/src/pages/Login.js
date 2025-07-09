import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Alert,
} from '@mui/material';
import { Lock, Email } from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(40,40,40,0.3) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
        }}
      />

      {/* Animated grid lines */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(50,50,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(50,50,50,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: isMobile ? 3 : 4,
              background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0a0a0a 100%)',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.1)',
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
            {/* Metal rivets */}
            {[
              { top: '10px', left: '10px' },
              { top: '10px', right: '10px' },
              { bottom: '10px', left: '10px' },
              { bottom: '10px', right: '10px' },
            ].map((pos, i) => (
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

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Lock sx={{ fontSize: 60, color: '#cecece', mb: 2 }} />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '25%',
                    width: '50%',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, rgba(200,200,200,0.5), transparent)',
                  },
                }}
              >
                Login
              </Typography>
            </Box>

            {error && (
              <Zoom in>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </Zoom>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
                InputProps={{
                  startAdornment: <Email sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
                InputProps={{
                  startAdornment: <Lock sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(45deg, #333333, #444444)',
                  borderRadius: '4px',
                  py: 1.5,
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                  border: '1px solid rgba(150,150,150,0.2)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #444444, #555555)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)',
                  },
                  '&:active': {
                    transform: 'translateY(1px)',
                  },
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}
              >
                Don't have an account?
              </Typography>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Register here
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;