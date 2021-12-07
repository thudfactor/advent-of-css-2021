import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import './App.css'
import { AppWrapper } from './styled/app-wrapper';
import { Controls } from './styled/controls';
import { TimerContents } from './styled/timer-contents';
import { Gear } from './gear';
import { Check } from './check';
import { Timer } from './timer';
import Button from './button';
import { CSSProperties } from 'styled-components';

const MaxTimer = 90 * 60 * 1000;
const MinTimer = 1 * 1000;
const DefaultTimer = 15 * 60 * 1000;

interface CSSCustomProperties extends CSSProperties {
  '--terminate': string;
}

function App() {
  const [currentTimer, setCurrentTimer] = useState(DefaultTimer);
  const [count, setCount] = useState(currentTimer);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
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
    if(editing) { setEditing(false) }
    if(!running && count === 0) {
      setCount(currentTimer);
    }
    setRunning(!running);
  }

  const settingsChange = () => {
    if(running) { setRunning(false); }
    setEditing(!editing);
  }

  const updateTimerValue = (newValue:number) => {
    let threshHoldTimer = newValue;
    if(newValue > MaxTimer) {
      threshHoldTimer = MaxTimer;
    } else if(newValue < MinTimer) {
      threshHoldTimer = MinTimer;
    }

    setCurrentTimer(threshHoldTimer);
    setCount(threshHoldTimer);

  }

  return (
    <AppWrapper style={{'--terminate': `${((currentTimer - count) / currentTimer) * 100}%`} as CSSCustomProperties} className={`${running ? 'running' : 'stopped'}`}>
      <TimerContents>
        <Timer updateTimerValue={updateTimerValue} current={count} editing={editing} />
        <Controls>
          <Button className="startButton text-gradient" click={buttonChange}>{ (running) ? `Stop` : `Start`}</Button>
          <Button className="settingsButton" click={settingsChange}>
            { editing && ( <Check /> ) }
            { !editing && ( <Gear /> ) }
          </Button>
        </Controls>
      </TimerContents>
    </AppWrapper>
  )
}

export default App
