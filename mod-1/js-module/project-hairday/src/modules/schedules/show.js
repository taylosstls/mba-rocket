import dayjs from "dayjs"

// Seleciona as sessões manhã / tarde / noite
const periodMorning = document.querySelector('#period-morning')
const periodAfternoon = document.querySelector('#period-afternoon')
const periodNight = document.querySelector('#period-night')

export function schedulesShow({ dailySchedules }) {
  try {
    // Limpa as listas
    periodMorning.innerHTML = ''
    periodAfternoon.innerHTML = ''
    periodNight.innerHTML = ''

    // Renderiza os agendamentos por período
    dailySchedules?.forEach((schedule) => {
      const item = `<li data-id=${schedule.id}>
        <strong>${dayjs(schedule.when).format("HH:mm")}</strong>
        <span>${schedule.name}</span>
        <img
          src="./src/assets/cancel.svg"
          alt="Cancelar"
          class="cancel-icon"
        />
      </li>`
      
      const hour = dayjs(schedule.when).hour()

      console.log(hour, item)

      // Renderiza o agendamento na sessão (manhã / tarde / noite)
      if (hour <= 12) { periodMorning.innerHTML += item }
      else if (hour > 12 && hour <= 18) { periodAfternoon.innerHTML += item }
      else { periodNight.innerHTML += item }

    });
    
  } catch(err) {
    alert("Não foi possível exibir os agendamentos")
    console.log(err)
  }

}