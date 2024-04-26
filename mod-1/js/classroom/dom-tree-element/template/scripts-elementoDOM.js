// Visualizar o componente
// obter o title da página.
console.log(document.title)

// Acessar o elemento pelo ID (SELETOR ID)
const guest = document.getElementById('guest-2')
console.log(guest)

// Mostra as propriedades do elemento
console.dir(guest)

// Acessar o elemento com class (SELETOR class)
const guestByList = document.getElementsByClassName('guest')
console.log(guestByList)

// Exibir o primeiro retorno da lista
// ou assim console.log(guestByList.item(0))
console.log(guestByList[1]);

// Selecionar lista elementos pela tag
const guestsTag = document.getElementsByTagName('li');
console.log(guestsTag);