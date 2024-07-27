import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  ContainerHome,
  CountdownContainer,
  FormContainer,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
  TimerInput,
} from './styles'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, {
    message: 'Informe a tarefa.',
  }),
  timer: z
    .number()
    .min(5, {
      message: 'Seu Timer precisa ser de pelo menos 5 minutos.',
    })
    .max(60, {
      message: 'Seu Timer pode ser de até 60 minutos.',
    }),
})

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  timer: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      timer: 0,
    },
  })

  // Observa os campos de input (useEffect)
  const taskValue = watch('task')
  const isSubmitDisabled = !taskValue

  // Retornar o ciclo ativo do Array
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Divisão do tempo total do timer, convertido para segundos
  const totalTimerSeconds = activeCycle ? activeCycle.timer * 60 : 0


  useEffect(() => {
    let countdown: number;

    if (activeCycle) {
      countdown = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsDifference >= totalTimerSeconds) {
          // Anota a data que o ciclo foi concluído
          setCycles(
            state => state.map(cycle => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            })
          )

          // Zera o timer
          setAmountSecondsPassed(totalTimerSeconds)

          clearInterval(countdown)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }

      }, 1000)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [activeCycle, totalTimerSeconds, activeCycleId])

  // Função de criação de um novo ciclo
  function handleCreateNewCycle({ task, timer }: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      timer,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  // Função de parar ciclo
  function handleInterruptCycle() {
    // Anota a data que o ciclo foi interrompido
    setCycles(
      (state) => state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    // Defina para que não tenha mais nenhum ciclo ativo
    setActiveCycleId(null)
  }

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
  }, [minutes, seconds, activeCycle])

  return (
    <ContainerHome>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
            disabled={!!activeCycle}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="timer">durante</label>
          <TimerInput
            id="timer"
            type="number"
            // min={5}
            // max={60}
            step={5}
            placeholder="00"
            disabled={!!activeCycle}
            {...register('timer', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </ContainerHome>
  )
}
