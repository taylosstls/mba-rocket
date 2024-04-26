const input = document.querySelector('input')
const form = document.querySelector('form')

input.addEventListener('input', () => {
  const value = input.value
  const regex = /\D+/g

  // Retorna o padrão encontrado na string
  console.log(value.match(regex))

  const isValid = regex.test(value)
  console.log(isValid) //Testa se o input só possui caracteres
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const regex = /\D+/g
  const value = input.value

  regex.test() ?
    alert('Padrão encontrado!') :
    alert('Valor inválido. Digite corretamente')

  console.log(value)
})