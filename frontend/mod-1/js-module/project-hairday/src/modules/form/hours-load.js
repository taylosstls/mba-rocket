import dayjs from 'dayjs'
import { openingHours, periodMapping } from '../../utils/opening-hours.js'
import { hoursClick } from './hours-click.js'

const listHours = document.querySelector("#hours")

export function hoursLoad({ date, dailySchedules }) {

  listHours.innerHTML = ''

  const opening = openingHours.map((hour) => {
    const [scheduleHour, _] = hour.split(":")

    // Obtém lista de horários ocupados
    const unavailableHours = dailySchedules.map((schedule) =>
      dayjs(schedule.when).format("HH:mm")
    )



    // Verifica se a hora está disponível
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
  
    const available = !unavailableHours.includes(hour) && !isHourPast

    return{
      hour,
      available
    }
  
  })

  opening.forEach(({hour, available}) => {
    const selectHour = `<li data-period="morning"
      value="${hour}"
      class="hour hour-${available ? 'available' : 'unavailable'}">
        ${hour}
    </li>`

    periodMapping.hasOwnProperty(hour) ? hourHeaderAdd(periodMapping[hour]) : ""

    listHours.innerHTML += selectHour
  })

  hoursClick()
}

function hourHeaderAdd(title) {
  const header = `<li class="hour-period">${title}</li>`
  listHours.innerHTML += header
}