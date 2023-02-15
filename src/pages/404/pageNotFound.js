import React from 'react'
import { Link } from 'react-router-dom'
import './pageNotFound.scss'

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const pageNotFound = () => {

  const renderStars = () => {
    let div = []
    for (let i = 1; i < 100; i++) {
      div.push(<div key={i} class="star"> </div>)
    }
    console.log("🚀 ~ file: pageNotFound.js:18 ~ renderStars ~ div", div)

    return div;
  }

  return (
    <>


      <div className='bg-purple body'>

        <div class="stars">
          {/* <div class="custom-navbar">
            <div class="brand-logo">
              <img src="http://salehriaz.com/404Page/img/logo.svg" width="80px"/>
            </div>
            <div class="navbar-links">
              <ul>
                <li><a href="http://salehriaz.com/404Page/404.html" target="_blank">Home</a></li>
                <li><a href="http://salehriaz.com/404Page/404.html" target="_blank">About</a></li>
                <li><a href="http://salehriaz.com/404Page/404.html" target="_blank">Features</a></li>
                <li><a href="http://salehriaz.com/404Page/404.html" class="btn-request" target="_blank">Request A Demo</a></li>
              </ul>
            </div>
          </div> */}

          <div class="central-body">
            {/* <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" /> */}
            
            {/* <h1>404</h1>
            <h2>Sepertinya anda terseasat karena salah alamat...</h2> */}

                <Typography variant="h1" component="div" color="common.white">
                  404
                </Typography>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography> */}
                <Typography sx={{ mb: 1.5 }} color="common.white">
                Sepertinya anda terseasat karena salah alamat...
                </Typography>

                

            {/* <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card> */}

            <Link to="/" class="btn-go-home"  >GO BACK HOME</Link>
          </div>

          <div class="objects">
            <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
            <div class="earth-moon">
              <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
              <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
            </div>
           
          </div>

          <div class="glowing_stars">
            {
              renderStars()
            }

          </div>

        </div>

      </div>
    </ >
  )
}

export default pageNotFound