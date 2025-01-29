const guests = document.querySelector('ul')
console.log(guests)

const newGuest  = document.createElement("li")
newGuest.id = 'guest-3'
newGuest.classList.add('guest')

const guestName  = document.createElement("span")

guestName.textContent = 'Gustavo Teixeira'

newGuest.append(guestName)
console.log(newGuest)

guests.prepend(newGuest)
