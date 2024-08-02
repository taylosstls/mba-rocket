import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  input {
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
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .75rem;

    padding: 1rem;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid ${props => props.theme['green-300']};
    color: ${props => props.theme['green-300']};
    font-weight: 700;
    transition: all .3s;

    &:hover {
      background-color: ${props => props.theme['green-500']};
      border: 1px solid ${props => props.theme['green-500']};
      color: ${props => props.theme.white};
    }
  }

`;