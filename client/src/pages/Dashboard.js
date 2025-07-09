import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
  Fade,
  Zoom,
  alpha,
  CircularProgress,
  Divider,
} from '@mui/material';
import { 
  Add, 
  AccessTime, 
  Edit, 
  Delete, 
  Memory, 
  Visibility, 
  Lock, 
  MoreVert, 
  ArrowForward,
  Mail
} from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [animateItems, setAnimateItems] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('/api/capsules', config);
        setCapsules(res.data);
        setLoading(false);
        
        // Trigger animation after data loads
        setTimeout(() => {
          setAnimateItems(true);
        }, 100);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  // Add scroll effect detection
  useEffect(() => {
    const handleScroll = () => {
      if (dashboardRef.current) {
        const dashboardTop = dashboardRef.current.getBoundingClientRect().top;
        if (dashboardTop < window.innerHeight - 100) {
          setAnimateItems(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.delete(`/api/capsules/${id}`, config);
      setCapsules(capsules.filter((capsule) => capsule._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Advanced metallic styles
  const cardStyle = {
    background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0a0a0a 100%)',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #333333, #888888, #333333)',
    },
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 15px 20px rgba(0,0,0,0.2)',
    }
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #333333, #444444)',
    borderRadius: '4px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
    border: '1px solid rgba(150,150,150,0.2)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    '&:hover': {
      background: 'linear-gradient(45deg, #444444, #555555)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: '#0a0a0a',
        }}
      >
        <CircularProgress 
          sx={{ 
            color: '#aaaaaa',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
        />
      </Box>
    );
  }

  return (
    <Box 
      ref={dashboardRef}
      sx={{
        background: '#0a0a0a',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        pt: isMobile ? 3 : 5,
        pb: 8,
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

      <Box 
        sx={{
          width: '90%',
          maxWidth: '1400px',
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 5,
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 3 : 0,
            }}
          >
            <Box>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{
                  color: '#ffffff',
                  fontWeight: '900',
                  letterSpacing: '1px',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: '0',
                    width: '60%',
                    height: '3px',
                    background: 'linear-gradient(90deg, rgba(200,200,200,0.5), transparent)',
                  }
                }}
              >
                MY TIME CAPSULES
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#aaaaaa', 
                  mt: 2,
                  fontWeight: 300,
                }}
              >
                Manage and track your digital memories
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/create-capsule')}
              sx={{
                ...buttonStyle,
                px: 3,
                py: 1.5,
                whiteSpace: 'nowrap',
              }}
            >
              Create New Capsule
            </Button>
          </Box>
        </Fade>

        {capsules.length === 0 ? (
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 8,
                py: 8,
                background: 'linear-gradient(135deg, rgba(40,40,40,0.3) 0%, rgba(20,20,20,0.3) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(70,70,70,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(60,60,60,0.1) 0%, transparent 70%)',
                  top: '-50px',
                  right: '-50px',
                }}
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '1px solid rgba(150,150,150,0.1)',
                  bottom: '-50px',
                  left: '-50px',
                }}
              />
              
              <Memory sx={{ fontSize: 60, color: '#aaaaaa', mb: 3 }} />
              
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#ffffff', 
                  mb: 2,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                You haven't created any time capsules yet
              </Typography>
              
              <Typography 
                sx={{ 
                  color: '#aaaaaa',
                  maxWidth: '500px', 
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                Start preserving your memories for the future. Create your first digital time capsule now.
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/create-capsule')}
                sx={{
                  ...buttonStyle,
                  px: 4,
                  py: 1.5,
                }}
              >
                Create Your First Capsule
              </Button>
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {capsules.map((capsule, index) => (
              <Grid item xs={12} sm={6} lg={4} key={capsule._id}>
                <Zoom 
                  in={animateItems} 
                  timeout={800 + index * 150}
                  style={{ transitionDelay: animateItems ? `${index * 100}ms` : '0ms' }}
                >
                  <Card sx={cardStyle}>
                    {/* Metal rivets in corners */}
                    {[
                      { top: '10px', left: '10px' },
                      { top: '10px', right: '10px' },
                    ].map((pos, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: 'absolute',
                          ...pos,
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, #888888 0%, #555555 100%)',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
                          zIndex: 5,
                        }}
                      />
                    ))}
                    
                    {/* Diagonal metallic accent */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '150%',
                        height: '150%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                        transform: 'translateY(-50%) rotate(25deg)',
                        pointerEvents: 'none',
                      }}
                    />

                    <CardContent sx={{ flexGrow: 1, position: 'relative', p: 3 }}>
                      {/* Status indicator */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: capsule.isDelivered ? '#4CAF50' : '#FFC107',
                          boxShadow: `0 0 10px ${capsule.isDelivered ? 'rgba(76,175,80,0.5)' : 'rgba(255,193,7,0.5)'}`,
                        }}
                      />

                      <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom
                        sx={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                          mb: 2,
                          pr: 3,
                          fontSize: '1.25rem',
                          borderLeft: '3px solid #555555',
                          pl: 2,
                          marginLeft: -2,
                        }}
                      >
                        {capsule.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: '#b0b0b0',
                          mb: 2,
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                        }}
                      >
                        {expandedId === capsule._id 
                          ? capsule.message 
                          : capsule.message.length > 80
                            ? `${capsule.message.substring(0, 80)}...` 
                            : capsule.message}
                      </Typography>
                      
                      {capsule.message.length > 80 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                          <Button 
                            size="small"
                            onClick={() => toggleExpand(capsule._id)}
                            sx={{ 
                              color: '#aaaaaa',
                              textTransform: 'none',
                              fontSize: '0.8rem',
                              '&:hover': {
                                color: '#ffffff',
                                background: 'transparent',
                              }
                            }}
                          >
                            {expandedId === capsule._id ? 'Show less' : 'Read more'}
                          </Button>
                        </Box>
                      )}
                      
                      <Divider sx={{ 
                        my: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                      }} />
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1.5,
                        opacity: 0.8, 
                      }}>
                        <AccessTime sx={{ mr: 1.5, color: '#aaaaaa', fontSize: '1rem' }} />
                        <Typography 
                          variant="body2" 
                          sx={{ color: '#aaaaaa' }}
                        >
                          Delivery: {format(new Date(capsule.deliveryDate), 'PPP')}
                        </Typography>
                      </Box>
                      
                      {/* Additional metadata */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        opacity: 0.8,
                      }}>
                        <Mail sx={{ mr: 1.5, color: '#aaaaaa', fontSize: '1rem' }} />
                        <Typography 
                          variant="body2" 
                          sx={{ color: '#aaaaaa' }}
                        >
                          {capsule.isDelivered ? 'Delivered' : 'Scheduled'}
                        </Typography>
                      </Box>
                      
                      {capsule.isDelivered && (
                        <Chip
                          label="Delivered"
                          sx={{ 
                            mt: 2, 
                            background: 'linear-gradient(45deg, #2E7D32, #388E3C)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.1)',
                            '.MuiChip-label': {
                              fontWeight: 500,
                            }
                          }}
                          size="small"
                        />
                      )}
                    </CardContent>
                    
                    <CardActions sx={{ 
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      p: 2,
                      background: 'rgba(0,0,0,0.2)',
                      justifyContent: 'space-between',
                    }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => navigate(`/capsule/${capsule._id}`)}
                        sx={{
                          color: '#cccccc',
                          '&:hover': {
                            color: '#ffffff',
                            background: 'rgba(255,255,255,0.05)',
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(capsule._id)}
                        sx={{
                          color: '#f44336',
                          '&:hover': {
                            color: '#ff5252',
                            background: 'rgba(244,67,54,0.08)',
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                    
                    {/* Tech circuit pattern */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        width: '80px',
                        height: '80px',
                        opacity: 0.05,
                        pointerEvents: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L70 10 L70 20 L40 20 L40 70 L30 70 L30 20 L10 20 Z' stroke='white' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        )}
        
        {capsules.length > 0 && (
          <Fade in={true} timeout={1500}>
            <Box 
              sx={{ 
                mt: 6, 
                display: 'flex', 
                justifyContent: 'center' 
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#777777',
                  textAlign: 'center',
                  maxWidth: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  p: 2,
                  border: '1px solid rgba(100,100,100,0.2)',
                  borderRadius: '4px',
                  background: 'rgba(30,30,30,0.3)',
                }}
              >
                Your time capsules are secured with advanced encryption technology. 
                Only the intended recipients will be able to access your memories
                on the specified delivery date.
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;