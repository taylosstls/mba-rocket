import { createContext, ReactNode, useState } from 'react'

import {
  CreateCycleData,
  Cycle,
  CyclesContextType,
} from '../../interface/Cycle'

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Retornar o ciclo ativo do Array
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Anota a data e hora que o ciclo foi concluído
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

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

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setSecondsPassed(0)

    // reset()
  }

  // Função de parar ciclo
  function interruptCurrentCycle() {
    // Anota a data e hora que o ciclo foi interrompido
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    // Defina para que não tenha mais nenhum ciclo ativo
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
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
