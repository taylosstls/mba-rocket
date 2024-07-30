import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ContainerHome } from './styles'

import { CountdownButton } from '../../components/atoms/CountdownButton'

import { NewCycleForm } from '../../components/molecules/NewCycleForm'
import { Countdown } from '../../components/molecules/Countdown'

import { CreateCycleData } from '../../interface/Cycle'

import { CyclesContext } from '../../contexts/CyclesContext'

import { newCycleFormValidationSchema } from '../../utils/validations/validationSchema'

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<CreateCycleData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      timer: 0,
    },
  })
  const { handleSubmit, watch } = newCycleForm

  // Observa os campos de input (useEffect)
  const taskValue = watch('task')
  const isSubmitDisabled = !taskValue

  return (
    <ContainerHome>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <CountdownButton variant="stop" onClick={interruptCurrentCycle} />
        ) : (
          <CountdownButton variant="start" disabled={isSubmitDisabled} />
        )}
      </form>
    </ContainerHome>
  )
}
