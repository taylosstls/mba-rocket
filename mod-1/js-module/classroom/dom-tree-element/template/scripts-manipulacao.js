// Retorna o conteúdo como texto
const guest = document.querySelector('#guest-1')

//guest.textContent = "Gustavo Teixeira"
//console.log(guest.textContent)

console.log(guest.textContent) // Retorna o conteúdo visível e oculto do HTML. Ex.: conteúdo com class="hide"
console.log(guest.innerText) // Retorna apenas o conteúdo visível do HTML.
console.log(guest.innerHTML) // Retorna apenas o texto do HTML.