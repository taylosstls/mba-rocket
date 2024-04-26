const input = document.querySelector('input')

// keydown = captura todos as teclas pressionadas
input.addEventListener('keydown', (e) => {
  console.log(e.key)  
})

// keypress = captura só teclas alfanuméricas e especiais pressionados
input.addEventListener('keypress', (e) => {
  console.log(e.key)
})

// ou pode seguir o formato input.addEventListener('change')
input.onchange = () => {
  inputChange()
}

function inputChange() {
  console.log('input mudou!')
}