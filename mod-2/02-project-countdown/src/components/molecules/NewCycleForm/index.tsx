import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { ErrorMessage, FormContainer, TaskInput, TimerInput } from './styles'

import { CyclesContext } from '../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">
        Vou trabalhar em
        <TaskInput
          id="task"
          type="text"
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestions"
          {...register('task')}
          disabled={!!activeCycle}
        />
        {errors.task && (
          <ErrorMessage>{errors.task.message as string}</ErrorMessage>
        )}
      </label>

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="timer">
        durante
        <TimerInput
          id="timer"
          type="number"
          step={5}
          placeholder="00"
          disabled={!!activeCycle}
          {...register('timer', { valueAsNumber: true })}
        />
        {errors.timer && (
          <ErrorMessage>{errors.timer.message as string}</ErrorMessage>
        )}
      </label>

      <span>minutos.</span>
    </FormContainer>
  )
}
