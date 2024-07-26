import { CircleStatus, ContainerHistory, HistoryList } from './styles'

export function History() {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <span>
                  <CircleStatus size={12} weight="fill" statusColor="green" />{' '}
                  Concluído
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </ContainerHistory>
  )
}