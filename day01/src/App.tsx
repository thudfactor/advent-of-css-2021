import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import './App.css'
import Button from './button';

const AppWrapper = styled.div`
  --timerWidth: 80vmin;
  --borderWidth: 2vmin;
  --redColor: hsl(0 87% 30%);
  --redCast: hsl(0 87% 90% / .2);
  --redShadow: hsl(0 20% 10% / .9);
  --greenColor: hsl(151 90% 34%);
  --greenCast: hsl(151 90% 34% / .2);
  --greenShadow: hsl(151 20% 10% / .9);
  --terminate: 0%;
  --activeColor: var(--redColor);
  --activeCast: var(--redCast);
  --activeShadow: var(--redShadow);

  &.running {
    --activeColor: var(--greenColor);
    --activeCast: var(--greenCast);
    --activeShadow: var(--redShadow);
  }

  box-shadow:  var(--activeShadow) 0px 20px 4vmin, var(--activeCast) 0px -20px 4vmin;

  color: whitesmoke;
  width: var(--timerWidth);
  height: var(--timerWidth);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  //border: 1px transparent solid;
  background: conic-gradient(
    from 180deg, 
    var(--activeColor) 0, 
    var(--activeColor) calc(var(--terminate)), 
    #000000 calc(var(--terminate) + 5%),
    #000000 105%);
  border-radius: 50%;
  overflow: hidden;

  > * {
    position: relative;
  }
  
  &::before {
    content: ' ';
    position: absolute;
    display: block;
    top: var(--borderWidth); 
    left: var(--borderWidth); 
    right: var(--borderWidth);
    bottom: var(--borderWidth);
    border-radius: 50%;
    background-image: radial-gradient(71.4% 71.4% at 51.7% 28.6%, #3A393F 0%, #17171A 100%);
  }
`;

function App() {
  const [currentTimer, setCurrentTimer] = useState(10 * 1000);
  const [count, setCount] = useState(currentTimer);
  const [running, setRunning] = useState(false);
  const requestRef = useRef(-1);
  const previousTimeRef = useRef(-1);

  const animate = (time: DOMHighResTimeStamp) => {
    if(previousTimeRef.current != -1) {
      const deltaTime = time - previousTimeRef.current;
      setCount(prevCount => {
        const nextCount = prevCount - deltaTime;
        return (nextCount > 0) ? nextCount : 0;
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    if(count === 0) {
      setRunning(false);
    }
  },[count]);

  // useLayoutEffect because useEffect sometimes runs too slow.
  // https://stackoverflow.com/questions/53781632/whats-useeffect-execution-order-and-its-internal-clean-up-logic-in-react-hooks
  useLayoutEffect(() => {

    if(!running || count <= 0) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = -1;
      previousTimeRef.current = -1;
    } else {
      requestRef.current = requestAnimationFrame(animate);
    }
    return ()=> cancelAnimationFrame(requestRef.current);
  }, [running]);

  const buttonChange = () => {
    if(!running && count === 0) {
      setCount(currentTimer);
    }
    setRunning(!running);
  }

  const settingsChange = () => {
    console.log('bar');
  }

  return (
    <AppWrapper style={{'--terminate': `${((currentTimer - count) / currentTimer) * 100}%`}} className={`${running ? 'running' : 'stopped'}`}>
      <span>{ Math.floor(count / 60000) }:{ String(Math.floor(count / 1000) % 60).padStart(2,'0') }</span>
      <Button click={buttonChange}>{ (running) ? `Stop` : `Start`}</Button>
      <Button click={settingsChange}>Settings</Button>
    </AppWrapper>
  )
}

export default App
