import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Image Upload', path: '/image-upload' },
    { label: 'Video Upload', path: '/video-upload' },
    { label: 'Live Capture', path: '/webcam' },
    { label: 'About', path: '/about' }
  ];

  const connectLinks = [
    { label: 'Contact Us', path: '#' },
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' }
  ];

  const FooterLink = ({ to, label }: { to: string; label: string }) => (
    <Typography
      component={Link}
      to={to}
      variant="body2"
      sx={{
        color: 'rgba(255, 255, 255, 0.7)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        '&:hover': {
          color: '#fff'
        }
      }}
    >
      {label}
    </Typography>
  );

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 600
                }}
              >
                <span style={{ color: '#2196f3' }}>Gesture</span>
                <span style={{ color: '#fff' }}>Flow</span>
              </Link>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 'xs' }}
              >
                Empowering communication through sign language interpretation using advanced technology.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {quickLinks.map((link) => (
                <FooterLink key={link.path} to={link.path} label={link.label} />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>
              Connect
            </Typography>
            <Stack spacing={2}>
              {connectLinks.map((link) => (
                <FooterLink key={link.path} to={link.path} label={link.label} />
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ mt: 8, pt: 8, borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'block' }}
        >
          © {currentYear} GestureFlow. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;