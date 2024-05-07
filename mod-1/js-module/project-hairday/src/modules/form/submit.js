import dayjs from "dayjs"

const form = document.querySelector("form")
const selectedDate = document.querySelector("#date")

const presentDay = dayjs(new Date()).format('YYYY-MM-DD')

selectedDate.value = presentDay
selectedDate.min = presentDay


form.onsubmit = (event) => {
  event.preventDefault()
}