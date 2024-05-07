import { schedulesDay } from "../schedules/load.js"

const selectedDate = document.querySelector("#date")

selectedDate.onchange = () => schedulesDay()