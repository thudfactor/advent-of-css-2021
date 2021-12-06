import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  flex-direction: column;

  button {
    font: 1rem 'Montserrat', cursive;
    letter-spacing: .6em;
    line-height: 1.218;
    text-transform: uppercase;
    border-width: 0;
    background-color: transparent;
    color: white;

    &:hover {
      color: var(--greenColor);
      -webkit-text-fill-color: var(--greenColor);
    }

    &.settingsButton {
      color: hsl(0 0% 35%);

      &:hover {
        color: var(--greenColor);
      }
    }
  }
`;

