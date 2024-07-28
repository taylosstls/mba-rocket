import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: 700;

  label {
    position: relative;
  }
`

const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  font-weight: 700;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-400']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const TimerInput = styled(BaseInput)`
  width: 4rem;
`

export const ErrorMessage = styled.span`
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 16px;

  color: ${(props) => props.theme['red-500']};
  font-size: 1rem;
  font-weight: 400;
  text-wrap: nowrap;
`
