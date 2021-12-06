import styled from 'styled-components';

export const AppWrapper = styled.div`
  --timerWidth: 80vmin;
  --borderWidth: 2vmin;
  --terminate: 0%;
  --activeColor: var(--redColor);
  --activeCast: var(--redCast);
  --activeShadow: var(--redShadow);
  --blur: 4vmin;
  --voffset: 2vmin;
  --hoffset: 0;

  &.running {
    --activeColor: var(--greenColor);
    --activeCast: var(--greenCast);
    --activeShadow: var(--redShadow);
  }

  box-shadow: hsl(0 0% 0% / .6) 0 2vmin 4vmin, hsl(90 20% 90% / .1) 0 -2vmin 4vmin;
  color: whitesmoke;
  width: var(--timerWidth);
  height: var(--timerWidth);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

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
