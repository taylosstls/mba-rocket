import { HandPalm, Play } from 'phosphor-react'
import { StartCountdownButton, StopCountdownButton } from './styles'

interface CountdownButtonProps {
  variant: 'start' | 'stop'
  onClick?: () => void
  disabled?: boolean
}

export function CountdownButton({
  variant,
  onClick,
  disabled,
}: CountdownButtonProps) {
  if (variant === 'start') {
    return (
      <StartCountdownButton type="submit" onClick={onClick} disabled={disabled}>
        <Play size={24} />
        Começar
      </StartCountdownButton>
    )
  }

  return (
    <StopCountdownButton type="button" onClick={onClick}>
      <HandPalm size={24} />
      Interromper
    </StopCountdownButton>
  )
}
