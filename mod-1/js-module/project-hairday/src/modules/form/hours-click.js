export function hoursClick() {
  const hours = document.querySelectorAll('.hour-available')
  console.log(hours)

  hours.forEach((available) => {
    available.addEventListener('click', (selected) => {

      // Removendo a classe selecionada de todas as LIs
      hours.forEach((hour) => hour.classList.remove('hour-selected'))

      selected.target.classList.add('hour-selected')
    })
  })
}