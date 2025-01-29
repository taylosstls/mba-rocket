import styled, { css } from "styled-components";

interface SummaryCardContainerProps {
  variant?: string;
}

export const SummaryCardContainer = styled.div<SummaryCardContainerProps>`
  background-color: ${props => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${props => props.variant === 'green' && css`
    background-color: ${props => props.theme['green-700']};
  `};
`;