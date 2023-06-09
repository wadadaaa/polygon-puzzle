import styled from "styled-components";

const StyledButton = styled.button`
  appearance: button;
  background-color: ${({ primary, danger }) => {
    if (primary) return "#1899d6";
    if (danger) return "#f44336";
    return "#cccccc";
  }};
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  :after {
    background-clip: padding-box;
    background-color: ${({ primary, danger }) => {
      if (primary) return "#1cb0f6";
      if (danger) return "#ef5350";
      return "#dddddd";
    }};
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  :main,
  :focus {
    user-select: auto;
  }

  :hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }

  :disabled {
    cursor: auto;
  }
`;

export default StyledButton;
