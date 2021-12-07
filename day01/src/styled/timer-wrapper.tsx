import styled from 'styled-components';

export const TimerWrapper = styled.div`
  --borderColor: transparent;
  font-family: 'bebasneue', 'serif';
  font-size: 32vmin;


  &.editing {
    --borderColor: white;
  }  

  input {
    font-family: inherit;
    font-size: inherit;
    color: yellow;
    background-color: transparent;
    border-width: 0;
    width: 2.75ch;
  }

  span, input {
    text-align: right;
    display: inline-block;
    border-bottom: 1px var(--borderColor) dotted;
  }
`;