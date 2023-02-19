import logo from './logo.svg';
import './App.css';

// Materials
import crab from './images/crab.png'
import cloud from './images/cloud.png'

// Hooks
import useWindowSize from "./hooks/useWindowSize";
import { useEffect, useState } from 'react';

function App() {

  let time = true;
  let count = 0;

  const textGroundA = "_._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._"
  const textGroundB = "._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._."
  const [textGround, setTextGround] = useState(textGroundA);

  const [cloudPosition, setCloudPosition] = useState("0%")

  let sceneMoves = []
  for (let i = 0; i < 100; i++) {
    sceneMoves.push(String(99-i)+"%")
  }

  const [width, height] = useWindowSize();

  const setAllState = () => {
    if (time) {
      setTextGround(textGroundB);
      time = false;
    }
    else {
      setTextGround(textGroundA);
      time = true;
    }
    setCloudPosition(sceneMoves[count])

    count += 1
    if (count > 99) {
      count = 0
    }

    setTimeout(() => {
      setAllState()
    },100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAllState();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className='content'>
      <div className='background'>
        <p className='ground'>{textGround}</p>
        <img className='scene' src={cloud} alt="Cloud" width="100" style={{'left': cloudPosition}} />
      </div>
      <div className='player'>
        <img src={crab} alt="Crab" width="100" />
      </div>
    </div>
  );
}

export default App;
