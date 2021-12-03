import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import './App.css'
import Button from './button';

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
    <div className="App">
      <span>{ Math.floor(count / 60000) }:{ String(Math.floor(count / 1000) % 60).padStart(2,'0') }</span>
      <Button click={buttonChange}>{ (running) ? `Stop` : `Start`}</Button>
      <Button click={settingsChange}>Settings</Button>
    </div>
  )
}

export default App
