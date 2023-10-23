import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 15px;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}

  background-color: #444; 
  color: #fff; 
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #eee; 
    color: #444;
    transform: scale(1.05);
  }

  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: #444; 
    border: 1px solid #444; 
    color: #fff; 
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid #444; 
    color: #444; 
  `}
  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return (
      <StyledButton {...rest}>{children}</StyledButton>
  );
}
