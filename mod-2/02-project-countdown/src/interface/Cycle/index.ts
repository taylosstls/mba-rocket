export interface Cycle {
  id: string
  task: string
  timer: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void

  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}
