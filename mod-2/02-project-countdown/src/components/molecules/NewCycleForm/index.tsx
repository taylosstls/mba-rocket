import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormContainer, TaskInput, TimerInput } from './styles'

import { CyclesContext } from '../../../pages/Home'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
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
        step={5}
        placeholder="00"
        disabled={!!activeCycle}
        {...register('timer', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
