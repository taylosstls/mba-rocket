window.addEventListener('load', () => {
  console.log('Página carregada com sucesso')
})

addEventListener('click', (e) => {
  e.preventDefault();

  console.log(e) // Retorna todas as informações de clique do evento.
  console.log(e.target) // Retorna o elemento atual clicado.
})

const ul = document.querySelector('ul')

ul.addEventListener('scroll', (e) => {
  
  if(ul.scrollTop > 220) {
    console.log('Fim da lista!')

    ul.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
})