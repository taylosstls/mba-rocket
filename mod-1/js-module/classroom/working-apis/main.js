// Utilizando via fetch com then

// fetch("http://localhost:3333/products")
//   .then((response) => response.json())
//   .then((data) => console.log(data))

// Utilizando com async await
async function fetchProducts() {
  const response = await fetch("http://localhost:3333/products")
  const data = await response.json()

  console.log(data)
}

fetchProducts()

// Retornando um produto específico pelo ID
async function fetchProductById(id) {
  const response = await fetch(`http://localhost:3333/products/${id}`)
  const data = await response.json()

  console.log(data)
}

fetchProductById('1')

const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log('ENVIANDO...')

  try {
    await fetch('http://localhost:3333/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: new Date().getTime().toString(),
        name: productName.value,
        price: productPrice.value
      })
    })

    form.reset()
    productName.focus()

    await fetchProducts()
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
})