import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { 
  Add, 
  AccessTime, 
  PhotoCamera, 
  Send, 
  Security,
  Cloud,
  Favorite,
  Star,
  ArrowForward,
  CheckCircle,
  Schedule,
  Memory,
  Email,
  Lock,
  Verified,
  TrendingUp,
  People,
  Timeline
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = localStorage.getItem('token');
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStep(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <AccessTime sx={{ fontSize: 60 }} />,
      title: 'Set Future Delivery',
      description: 'Choose when you want your time capsule to be delivered. It could be next month, next year, or even decades from now.',
      color: '#1976d2'
    },
    {
      icon: <PhotoCamera sx={{ fontSize: 60 }} />,
      title: 'Add Media',
      description: 'Include photos, videos, or audio recordings to make your time capsule even more special and memorable.',
      color: '#1976d2'
    },
    {
      icon: <Send sx={{ fontSize: 60 }} />,
      title: 'Automatic Delivery',
      description: 'Your time capsule will be automatically delivered via email on the specified date, ensuring your message reaches its destination.',
      color: '#1976d2'
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer, Bangalore',
      content: 'Sent a time capsule to my future self on my wedding day. When it arrived 5 years later, it brought tears of joy!',
      rating: 5,
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Father, Delhi',
      content: 'Created capsules for my children\'s 18th birthdays. The joy on their faces when they received them was priceless.',
      rating: 5,
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Ananya Patel',
      role: 'Teacher, Mumbai',
      content: 'Used this for my students\' graduation. They loved receiving their time capsules with their younger selves\' dreams.',
      rating: 5,
      avatar: '/api/placeholder/40/40'
    }
  ];

  const benefits = [
    { icon: <CheckCircle />, text: 'Preserve memories forever' },
    { icon: <CheckCircle />, text: 'Strengthen family bonds' },
    { icon: <CheckCircle />, text: 'Surprise your future self' },
    { icon: <CheckCircle />, text: 'Document life milestones' },
    { icon: <CheckCircle />, text: 'Share with loved ones' },
    { icon: <CheckCircle />, text: 'Secure & reliable delivery' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, #1a237e 100%)`,
          color: 'white',
          py: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Chip
                      label="✨ Digital Time Capsule Platform"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        mb: 3,
                        fontWeight: 'bold',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Typography
                      component="h1"
                      variant={isMobile ? 'h3' : 'h2'}
                      gutterBottom
                      sx={{
                        fontWeight: 800,
                        mb: 3,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.2
                      }}
                    >
                      Your Digital Time Capsule Awaits
                    </Typography>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Typography
                      variant={isMobile ? 'h6' : 'h5'}
                      paragraph
                      sx={{
                        maxWidth: 600,
                        mb: 4,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      Create meaningful connections across time. Preserve your most precious memories, 
                      thoughts, and messages for the future - delivered exactly when you want them.
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<Add />}
                          endIcon={<ArrowForward />}
                          onClick={() => navigate(isAuthenticated ? '/create-capsule' : '/register')}
                          sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,0.9)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                            },
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isAuthenticated ? 'Create Capsule' : 'Start Free'}
                        </Button>
                      </motion.div>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                        sx={{
                          color: 'white',
                          borderColor: 'white',
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                          },
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          fontWeight: 'bold'
                        }}
                      >
                        Learn More
                      </Button>
                    </Stack>
                  </motion.div>

                  {/* Trust indicators */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Verified sx={{ color: '#4caf50' }} />
                        <Typography variant="body2">Secure & Reliable</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Lock sx={{ color: '#4caf50' }} />
                        <Typography variant="body2">Privacy Protected</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Cloud sx={{ color: '#4caf50' }} />
                        <Typography variant="body2">Cloud Stored</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    p: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    How It Works
                  </Typography>
                  
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>1</Avatar>
                      <Typography>Create your time capsule with messages and media</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>2</Avatar>
                      <Typography>Set your delivery date and recipients</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>3</Avatar>
                      <Typography>Receive your capsule when the time comes</Typography>
                    </Box>
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Floating elements */}
        <Box sx={{ position: 'absolute', top: '20%', left: '10%', opacity: 0.1 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <AccessTime sx={{ fontSize: 100 }} />
          </motion.div>
        </Box>
        <Box sx={{ position: 'absolute', bottom: '20%', right: '10%', opacity: 0.1 }}>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <Memory sx={{ fontSize: 80 }} />
          </motion.div>
        </Box>
      </Box>

      {/* Enhanced Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }} id="features">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Key Features
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Everything you need to create and manage your digital time capsules
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-8px)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 3,
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced Call to Action Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                zIndex: 1
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 800, mb: 2 }}
              >
                Ready to Preserve Your Memories?
              </Typography>
              <Typography 
                variant="h6" 
                paragraph 
                sx={{ 
                  mb: 4, 
                  maxWidth: 600, 
                  mx: 'auto',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                Start creating your digital time capsule today and send messages to the future.
              </Typography>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  onClick={() => navigate(isAuthenticated ? '/create-capsule' : '/register')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    },
                    px: 6,
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    minWidth: 200,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isAuthenticated ? 'Create New Capsule' : 'Get Started'}
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>

        {/* Background decorative elements */}
        <Box sx={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.1 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <Send sx={{ fontSize: 80 }} />
          </motion.div>
        </Box>
        <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.1 }}>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          >
            <Favorite sx={{ fontSize: 60 }} />
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

