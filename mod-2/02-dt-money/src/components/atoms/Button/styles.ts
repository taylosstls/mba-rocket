import styled from "styled-components";

export const NewTransactionButton = styled.button`
  height: 50px;
  padding: 0 1.25rem;
  border: 0 none;
  border-radius: 6px;
  cursor: pointer;

  color: ${props => props.theme.white};
  background-color: ${props => props.theme['green-500']};
  font-weight: bold;
  transition: all .3s;
  
  &:hover {
    background-color: ${props => props.theme['green-300']};
  }
`;
