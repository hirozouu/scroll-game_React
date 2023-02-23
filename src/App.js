import logo from './logo.svg';
import './App.css';

// Materials
import crab from './images/crab.png'
import cloud from './images/cloud.png'

// Hooks
import useWindowSize from "./hooks/useWindowSize";
import { useEffect, useState } from 'react';

// Variables and Constants
// jump
let isJumping = false;
let countJump = 0;

const JUMP_HEIGHT = 10 // [%]
const JUMP_TIME = 10 // [frame]
let jumpMoves = []
const b = (JUMP_TIME-1)/2
const c = JUMP_HEIGHT
const a = -c / (b * b)
for (let i = 0; i < JUMP_TIME; i++) {
  jumpMoves.push(String(parseInt(55+a*(i-b)*(i-b)-c))+"%")
}

// background
const TEXT_GROUND_A = "_._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._"
const TEXT_GROUND_B = "._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._."
let time = true;
let count = 0;

let sceneMoves = []
for (let i = 0; i < 100; i++) {
  sceneMoves.push(i)
}

function App() {
  const [textGround, setTextGround] = useState(TEXT_GROUND_A);

  const [cloudPositionA, setCloudPositionA] = useState("99%")
  const [cloudPositionB, setCloudPositionB] = useState("75%")

  const [playerPosition, setPlayerPosition] = useState("55%")

  const onClickEvent = () => {
    isJumping = true;
  }

  const [width, height] = useWindowSize();

  const setAllState = () => {
    if (time) {
      setTextGround(TEXT_GROUND_B);
      time = false;
    }
    else {
      setTextGround(TEXT_GROUND_A);
      time = true;
    }

    setCloudPositionA(String(99-sceneMoves[count])+"%")
    setCloudPositionB(String(99-((sceneMoves[count]+10)%100))+"%")

    if (isJumping === true) {
      setPlayerPosition(jumpMoves[countJump])
      countJump += 1;
      
      if (countJump === JUMP_TIME) {
        countJump = 0;
        isJumping = false;
      }
    }
    
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
    <div className='content' onClick={onClickEvent}>
      <div className='background'>
        <img className='scene' id='a' src={cloud} alt="Cloud" width="80vw" style={{'left': cloudPositionA}} />
        <img className='scene' id='b' src={cloud} alt="Cloud" width="80vw" style={{'left': cloudPositionB}} />
      </div>
      <div className='ground'>
        {textGround}
      </div>
      <div className='player'>
        <img src={crab} alt="Crab" width="100vw" style={{'top': playerPosition}}/>
      </div>
    </div>
  );
}

export default App;
