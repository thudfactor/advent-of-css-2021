import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  flex-direction: column;

  button {
    border-width: 0;

    &:hover {
      color: var(--greenColor);
      -webkit-text-fill-color: var(--greenColor);
    }

    &.startButton {
      font-family: 'Montserrat', sans-serif;
      font-size: clamp(.75rem, 1.5vmin, 2rem);
      display: inline-block;
      letter-spacing: .6em;
      text-indent: .6em;
      line-height: 1.218;
      text-transform: uppercase;
      text-align: center;
      color: white;
      background-color: transparent;
    }

    &.settingsButton {
      color: hsl(0 0% 35%);
      text-indent: 0;
      background-color: transparent;

      svg {
        width: clamp(1rem, 2vmin, 4rem);
      }

      &:hover {
        color: var(--greenColor);
      }
    }
  }
`;

