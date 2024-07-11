import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Container, Avatar, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../img/cyberpunk-warrior-urban-scenery.jpg';
import '../App.css';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f0c29 30%, #302b63 90%, #24243e)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 0 20px #0ff',
  padding: theme.spacing(4),
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300%',
    height: '300%',
    background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.2))',
    opacity: 0.3,
    animation: 'moveGlow 5s linear infinite',
    transform: 'translate(-50%, -50%) rotate(0deg)',
  },
  '@keyframes moveGlow': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
}));

const GlowingTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#00e5ff',
    },
    '&:hover fieldset': {
      borderColor: '#00e5ff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00e5ff',
      boxShadow: '0 0 5px #00e5ff',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#00e5ff', // สีของป้ายชื่อ
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: '#00e5ff',
  },
  backgroundColor: '#1f1f1f',
  color: '#fff',
  '& .MuiInputBase-input': {
    color: '#fff',
  },
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00e5ff',
  boxShadow: '0 0 10px #00e5ff',
  '&:hover': {
    backgroundColor: '#00b3cc',
    boxShadow: '0 0 20px #00b3cc',
  },
}));

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        username: username,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Redirect to home page or dashboard
      window.location.href = '/home';
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='bg1'>
        <StyledContainer component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" color="#00e5ff">
              IIoT System
            </Typography>
            <Avatar sx={{ m: 1, width: 250, height: 250 }}>
              <img src={Logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
            </Avatar>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <GlowingTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <GlowingTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error">{error}</Typography>}
              <GlowingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Sign In'}
              </GlowingButton>
            </Box>
          </Box>
        </StyledContainer>
      </div>
    </>
  );
};

export default LoginPage;
