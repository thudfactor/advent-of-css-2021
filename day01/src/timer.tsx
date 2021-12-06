import { ChangeEvent } from 'react';
import { TimerWrapper } from './styled/timer-wrapper';

type TimerProps = {
  current: number;
  editing: Boolean;
  updateTimerValue: Function;
}

const minutes = (milliseconds: number): number => {
  return Math.floor(milliseconds/60000);
}

const seconds = (millilseconds: number) => {
  return Math.ceil(millilseconds / 1000) % 60;
}

export const Timer = ({current, editing, updateTimerValue}:TimerProps) => {
  const displayMinutes = String(minutes(current)).padStart(2, '0');
  const displaySeconds = String(seconds(current)).padStart(2, '0');

  const minuteChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newMinutes = parseInt(value) * 60000;
    const oldSeconds = seconds(current) * 1000;
    updateTimerValue(newMinutes + oldSeconds);
  }

  const secondChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newSeconds = parseInt(value) * 1000;
    const oldMinutes = minutes(current) * 60000;
    updateTimerValue(newSeconds + oldMinutes);
  }

  return (
    <TimerWrapper className={`text-gradient ${(editing ? "editing" : "")}`}>
      { !editing &&
        ( <><span>{ displayMinutes }</span>:<span>{ displaySeconds }</span></> )
      }
      { editing &&
        ( <>
            <label>
              <span className="sr-only">Minutes</span>
              <input type="number" onChange={minuteChange} min="0" max="90" value={displayMinutes} />
            </label>
            :
            <label>
              <span className="sr-only">Seconds</span>
              <input type="number" onChange={secondChange} min="0" max="59" value={displaySeconds} />
            </label>
          </> 
        )
      }
    </TimerWrapper>
  )
}

