import { SpinnerGap } from "phosphor-react";
import styled, { keyframes } from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled(SpinnerGap)`
  animation: ${spin} 1s linear infinite;
`;