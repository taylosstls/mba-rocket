import { createContext, ReactNode, useReducer, useState } from 'react'

import {
  CreateCycleData,
  Cycle,
  CyclesContextType,
} from '../../interface/Cycle'

import { cyclesReducer } from '../../reducers/cycles/reducer'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../../reducers/cycles/actions'

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    })

  const { cycles, activeCycleId } = cyclesState;

  // Retornar o ciclo ativo do Array
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // Função de criação de um novo ciclo
  function createNewCycle({ task, timer }: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      timer,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
  }

  // Função de parar o ciclo atual
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  // Função de conclusão de ciclo
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
