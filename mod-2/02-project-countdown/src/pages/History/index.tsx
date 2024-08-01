import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CircleStatus, ContainerHistory, HistoryList } from './styles'

import { CyclesContext } from '../../contexts/CyclesContext'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <ContainerHistory>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              const formattedDistance = formatDistanceToNow(
                new Date(cycle.startDate),
                {
                  addSuffix: true,
                  locale: ptBR,
                },
              )
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.timer} minutos</td>
                  <td>
                    {formattedDistance.charAt(0).toUpperCase() +
                      formattedDistance.slice(1)}
                  </td>
                  <td>
                    <span>
                      {cycle.finishedDate && (
                        <>
                          <CircleStatus
                            size={12}
                            weight="fill"
                            $statusColor="green"
                          />{' '}
                          Concluído
                        </>
                      )}

                      {cycle.interruptedDate && (
                        <>
                          <CircleStatus
                            size={12}
                            weight="fill"
                            $statusColor="red"
                          />{' '}
                          Interrompido
                        </>
                      )}

                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <>
                          <CircleStatus
                            size={12}
                            weight="fill"
                            $statusColor="yellow"
                          />{' '}
                          Em andamento
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </ContainerHistory>
  )
}
