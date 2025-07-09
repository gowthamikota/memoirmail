import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material';
import { Home, Add, Dashboard as DashboardIcon, ExitToApp } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Slide in direction="down">
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#0a0a0a',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ py: 1, px: { xs: 2, sm: 4 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
            }}
          >
            <Home sx={{ mr: 1, fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: 'Montserrat, Roboto, sans-serif',
                background: 'linear-gradient(to right, #888888, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Time Capsule
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    startIcon={<DashboardIcon />}
                    sx={{
                      color: '#ffffff',
                      fontWeight: 500,
                      px: isMobile ? 1 : 2,
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    component={RouterLink}
                    to="/create-capsule"
                    startIcon={<Add />}
                    sx={{
                      color: '#ffffff',
                      fontWeight: 500,
                      px: isMobile ? 1 : 2,
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    Create Capsule
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    onClick={handleLogout}
                    startIcon={<ExitToApp />}
                    sx={{
                      color: '#ffffff',
                      fontWeight: 500,
                      px: isMobile ? 1 : 2,
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        background: 'rgba(255,50,50,0.2)',
                        color: theme.palette.error.main,
                      },
                    }}
                  >
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 500,
                      px: isMobile ? 1 : 2,
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 500,
                      px: isMobile ? 1 : 2,
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    Register
                  </Button>
                </motion.div>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
