window.addEventListener('load', () => {
  const form = document.querySelector('form')
  
  const amount = document.querySelector('#amount')
  const expense = document.querySelector('#expense')
  const category = document.querySelector('#category')

  const expenseList = document.querySelector('aside ul')

  // Formatar valor
  amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '')

    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)

  }

  // Captura o envio de submit e faz o prevent
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    // Cria o objeto com os detalhes de despesa
    const newExpense = {
      id: new Date().getTime(),
      expense: expense.value,
      category_id: category.value,
      category_name: category.options[category.selectedIndex].text,
      amount: amount.value,
      created_at: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
    }

    expenseAdd(newExpense)
    updateTotals()

    form.reset()
    expense.focus()
  })

  expenseList.addEventListener('click', function(event) {
    //Verifica se o elemento clicado é o ícone X
    if(event.target.classList.contains('remove-icon')) {
      const item = event.target.closest('.expense')
      item.remove()

      updateTotals()
    }
  })

  function expenseAdd(newExpense) {
    try {
      const expenseItem = `
        <li class="expense">
          <img src="./img/${newExpense.category_id}.svg" alt="Ícone de ${newExpense.category_name}" />
          <div class="expense-info">
            <span><small>${newExpense.created_at}</small><br/>
            ${newExpense.category_name}</span>
            <strong>${newExpense.expense}</strong>
          </div>
          <span class="expense-amount" data-price=${newExpense.amount.replace('R$', '').trim()}><small>R$</small>${newExpense.amount.replace('R$', '').trim()}</span>
          <img src="./img/remove.svg" alt="remover" class="remove-icon" />
        </li>
      `

      expenseList.innerHTML += expenseItem

    } catch (error) {
      alert('Não foi possível atualizar a lista de despesas')
      console.log(error)
    }
  }

  function updateTotals() {
    try {
      const items = expenseList.children
      const expenseQtd = document.querySelector('header .expense-qtd')
      const totalExpense = document.querySelector('header h2')
      
      expenseQtd.textContent = `${items.length} ${items.length > 1 ? 'quantidades' : 'quantidade'}`
  
      let totalPrice = 0

      for (let item = 0; item < items.length; item++) {
        const itemAmount = items[item].querySelector('.expense-amount')
        const dataPrice = itemAmount.getAttribute('data-price')

        totalPrice += parseFloat(dataPrice.replace(/\./g, '').replace(',', '.'))
      }

      totalExpense.innerHTML = `<small>R$</small> ${formatCurrencyBRL(totalPrice).replace('R$', '').trim()}`
  
    } catch (error) {
      alert('Não foi possível atualizar a o valor total da lista')
      console.log(error)
    }
  }

  function formatCurrencyBRL(value) {
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return value
  }

  updateTotals()
})