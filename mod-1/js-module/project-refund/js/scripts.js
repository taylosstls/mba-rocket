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
      created_at: new Date()
    }

    expenseAdd(newExpense)

    form.reset()
  
  })

  function expenseAdd(newExpense) {
    try {
      const expenseItem = `
        <li class="expense">
          <img src="./img/${newExpense.category_id}.svg" alt="Ícone de ${newExpense.category_name}" />
          <div class="expense-info">
            <strong>${newExpense.expense}</strong>
            <span>${newExpense.category_name}</span>
          </div>
          <span class="expense-amount"><small>R$</small>${newExpense.amount.replace('R$', '').trim()}</span>
          <img src="./img/remove.svg" alt="remover" class="remove-icon" />
        </li>
      `

      expenseList.innerHTML += expenseItem

    } catch (error) {
      alert('Não foi possível atualizar a lista de despesas')
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
})