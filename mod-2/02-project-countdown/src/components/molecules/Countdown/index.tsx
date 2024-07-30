import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CountdownContainer, Separator } from './styles'

import { CyclesContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // Divisão do tempo total do timer, convertido para segundos
  const totalTimerSeconds = activeCycle ? activeCycle.timer * 60 : 0

  useEffect(() => {
    let countdown: number

    if (activeCycle) {
      countdown = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalTimerSeconds) {
          markCurrentCycleAsFinished()

          // Quando terminar o countdown, mostrará 00:00
          setSecondsPassed(totalTimerSeconds)

          clearInterval(countdown)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [
    activeCycle,
    totalTimerSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  // Tempo do Counter total - tempo atual
  const currentSeconds = activeCycle
    ? totalTimerSeconds - amountSecondsPassed
    : 0

  // total de minutos, arredondando sempre para baixo
  const minutesAmount = Math.floor(currentSeconds / 60)

  // total de segundos, considerando o resto da operação
  const secondsAmount = currentSeconds % 60

  // Exibição dos minutos, transformados em String
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle, markCurrentCycleAsFinished])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
