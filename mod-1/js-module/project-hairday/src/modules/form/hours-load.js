import dayjs from 'dayjs'
import { openingHours, periodMapping } from '../../utils/opening-hours.js'
import { hoursClick } from './hours-click.js'

const listHours = document.querySelector("#hours")

export function hoursLoad({ date }) {

  listHours.innerHTML = ''


  const opening = openingHours.map((hour) => {
    const [scheduleHour, _] = hour.split(":")

    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs())
    console.log(scheduleHour, isHourPast)
  
    return{
      hour,
      available: isHourPast
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