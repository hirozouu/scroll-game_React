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

  const [cloudPositionA, setCloudPositionA] = useState("99%")
  const [cloudPositionB, setCloudPositionB] = useState("75%")

  let sceneMoves = []
  for (let i = 0; i < 100; i++) {
    sceneMoves.push(i)
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

    setCloudPositionA(String(99-sceneMoves[count])+"%")
    setCloudPositionB(String(99-((sceneMoves[count]+10)%100))+"%")
    
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
        <img className='scene' id='a' src={cloud} alt="Cloud" width="80vw" style={{'left': cloudPositionA}} />
        <img className='scene' id='b' src={cloud} alt="Cloud" width="80vw" style={{'left': cloudPositionB}} />
      </div>
      <div className='ground'>
        {textGround}
      </div>
      <div className='player'>
        <img src={crab} alt="Crab" width="100vw" />
      </div>
    </div>
  );
}

export default App;
