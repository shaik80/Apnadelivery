import React from 'react'
import logo from '../logo (2).png';
import '../App.css';
import useStyles from '../css'
import { CircularProgress } from '@material-ui/core';

      export default function Loader(){
        const classes = useStyles();
        const [progress, setProgress] = React.useState(0);
        // const [switchprogress, setswitchProgress] = React.useState(true);
        React.useEffect(() => {
            function tick() {
                // reset when reaching 100%
                setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
            }
        setInterval(tick, 100);
        
      }, []);
      if( progress == 50){
        window.location.replace("http://localhost:3000/homepage");
      }
          return (
            <div className="App">
            <header className="App-header">
            <div className={classes.wrapper}>
            {<CircularProgress size={235} className={classes.fabProgress} /> || progress}
             <img src={logo} className="App-logo" alt="logo" />
              </div>  
              <h1 className="App-heading">Apna delivery</h1>
              <p>Be  happy and make happy</p>
            </header>
          </div>
        )
}
