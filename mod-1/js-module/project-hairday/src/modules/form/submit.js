import dayjs from "dayjs"

const form = document.querySelector("form")
const selectedDate = document.querySelector("#date")

const presentDay = dayjs(new Date()).format('YYYY-MM-DD')

AnalyserNode = presentDay
selectedDate.min = presentDay

const clientName = document.querySelector("#client")


form.onsubmit = (event) => {
  event.preventDefault()

  try {
    const name = clientName.value.trim()
    if(!name) return alert("Informe o nome do cliente")
      
    const hourSelected = document.querySelector('.hour-selected')
    if(!hourSelected) return alert("Selecione a hora")

    const [hour] = hourSelected.innerText.split(":")

    const when = dayjs(selectedDate.value).add(hour, "hour")

    const id = new Date().getTime()

    console.log({
      id, name, when
    })

  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}