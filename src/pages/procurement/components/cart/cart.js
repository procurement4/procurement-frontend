import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const cart = () => {
  return (
    <Box sx={{ minWidth: 500,  maxWidth: 400, marginRight: 30,  marginTop: 2}}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Just For an example
          </Typography>
          <Typography variant="h5" component="div">
            Procurement Name
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            priority
          </Typography>
          <Typography variant="body2">
           Subtotal
            <br />
            {'"$$$$$$"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Submit</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default cart