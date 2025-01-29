import { apiConfig } from './api-config.js'

export async function scheduleNew({ id, name, when }){
  try {
    // Faz a requisição para envio dos parametros de agendamento.
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, name, when })
    })

    alert("Agendamento realizado com sucesso!")
  } catch (err) {
    alert("Não foi possível agendar. Tente novamente mais tarde.")
    console.log(err)
  }
}