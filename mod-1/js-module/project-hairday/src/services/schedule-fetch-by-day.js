import dayjs from 'dayjs'
import { apiConfig } from './api-config.js'

export async function scheduleFetchByDay({ date }) {
  try {
    // Fazendo a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    // Converte para JSON
    const data = await response.json()

    console.log(data)

    // Filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) =>
      // Verifica se a data está no mesmo dia
      dayjs(date).isSame(schedule.when, "day")
    )

    return dailySchedules
  } catch (err) {
    console.log(err)
    alert("Não foi possível buscar os agendamentos do dia selecionado.")
  }
}