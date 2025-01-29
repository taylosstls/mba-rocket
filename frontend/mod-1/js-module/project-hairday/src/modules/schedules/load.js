import { scheduleFetchByDay } from '../../services/schedule-fetch-by-day.js'
import { hoursLoad } from '../form/hours-load.js'
import { schedulesShow } from './show.js'

const selectedDate = document.querySelector("#date")

export async function schedulesDay() {

  const date = selectedDate.value

  // Busca na API os agendamentos registrados
  const dailySchedules = await scheduleFetchByDay({ date })

  schedulesShow({ dailySchedules })

  // Renderiza as horas disponíveis do dia da API
  hoursLoad({ date, dailySchedules })
}