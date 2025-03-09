import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
import ImageUpload from './pages/ImageUpload';
import VideoUpload from './pages/VideoUpload';
import WebcamPage from './pages/Webcam';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#ff4081',
      light: '#ff80ab',
      dark: '#f50057'
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.7)'
    }
  },
  typography: {
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px'
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.5
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/image-upload" element={<Layout><ImageUpload /></Layout>} />
        <Route path="/video-upload" element={<Layout><VideoUpload /></Layout>} />
        <Route path="/webcam" element={<Layout><WebcamPage /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
