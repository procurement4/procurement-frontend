import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function UserProfile() {
  const img = "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-600w-1365533969.jpg"
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'grey', height: '70vh', marginTop: 10 }}>
          <Card sx={{ maxWidth: 560 }}>
            <CardMedia
              sx={{ height: 240 }}
              image={img}
              title="User Profile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Finance Director
              </Typography>
              <Typography variant="body2" color="text.secondary">
                financedirector@gmail.com
              </Typography>
              <Typography sx={{marginTop: 1}} variant="body2" color="text.secondary">
                Finance
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
}