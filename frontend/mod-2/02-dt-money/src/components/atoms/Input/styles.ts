import styled from "styled-components";

export const InputContainer = styled.input`
  flex: 1;
  border-radius: 6px;
  border: 0 none;

  background-color: ${props => props.theme['gray-900']};
  color: ${props => props.theme['gray-300']};
  padding: 1rem;
  transition: all .3s;

  &::placeholder {
    color: ${props => props.theme['gray-500']};
  }
`;