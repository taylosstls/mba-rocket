import { schedulesDay } from "./load.js" 
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll('.period')

// Gera evento click para cada evento de lista (manhã / tarde / noite)

periods.forEach((period) => {
  period.addEventListener('click', async (event) => {
    if(event.target.classList.contains('cancel-icon')) {
      const item = event.target.closest("li") // Obtém a li pai do elemento clicado.
      const { id } = item.dataset //Pega o ID do dataset

      if (id) {
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")

        if(isConfirm) {
          await scheduleCancel({ id })
          schedulesDay() // Recarrega a lista de agendamentos
        }
      }
    }
  })
})