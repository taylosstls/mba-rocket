import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${props => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  position: relative;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
