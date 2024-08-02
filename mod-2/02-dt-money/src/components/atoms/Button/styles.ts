import styled from "styled-components";

export const StyledButton = styled.button`
  height: 50px;
  padding: 0 1.25rem;
  border: 0 none;
  border-radius: 6px;
  cursor: pointer;

  font-weight: bold;
  transition: all .3s;

  &.primary {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme['green-500']};

    &:hover {
      background-color: ${props => props.theme['green-300']};
    }
  }

  &.transparent {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: 1rem;
    background-color: transparent;
    border: 1px solid ${props => props.theme['green-300']};
    color: ${props => props.theme['green-300']};

    &:hover {
      background-color: ${props => props.theme['green-500']};
      border: 1px solid ${props => props.theme['green-500']};
      color: ${props => props.theme.white};
    }
  }
`;