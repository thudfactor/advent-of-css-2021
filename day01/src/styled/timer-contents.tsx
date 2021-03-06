import styled from 'styled-components';
import { Controls } from './controls';

export const TimerContents = styled.div`
  position: relative;
  
  ${Controls} {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    gap: 2vmin;
  }
`;