window.addEventListener('load', () => {
  const form = document.querySelector('form') 
  const amount = document.querySelector('#amount')
  const currency = document.querySelector('#currency')

  const coinsValue = {
    'USD': { value: 5.12, symbol: 'US$', name: 'Dólares' },
    'EUR': { value: 5.47, symbol: '€', name: 'Euros' },
    'GBP': { value: 6.39, symbol: '£', name: 'Libras' } }

  // Match and replace non-alphabetic characters value with an empty string
  amount.addEventListener('input', () => {
    let value = amount.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = Number(value) / 100; // Converte para número e divide por 100
    amount.value = value.toFixed(2); // Formata o número para exibir duas casas decimais
});


  form.onsubmit = (e) => {
    e.preventDefault()

    const moneyValue = currency.value;

    switch (moneyValue) {
      case 'USD':
        convertCurrency(amount.value, coinsValue[moneyValue].value, coinsValue[moneyValue].symbol, coinsValue[moneyValue].name);
        break;
      case 'EUR':
        convertCurrency(amount.value, coinsValue[moneyValue].value, coinsValue[moneyValue].symbol, coinsValue[moneyValue].name);
        break;
      case 'GBP':
        convertCurrency(amount.value, coinsValue[moneyValue].value, coinsValue[moneyValue].symbol, coinsValue[moneyValue].name);
        break;
      default:
        break;
    }
  }

  function convertCurrency(amount, price, symbol) {
    const priceChange = Number(amount.replace(',', '.'))
    const footer = document.querySelector('main footer')
    const description = document.querySelector('#description')
    const result = document.querySelector('#result')

    try {
      description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
      result.textContent = `${formatCurrencyBRL(priceChange * price).replace('R$', '').trim()} Reais`
      
      footer.classList.add('show-result')
      
    } catch (error) {
      console.log(error)
      footer.classList.remove('show-result')
      
      alert('Não foi possível converter. Tente novamente mais tarde.')
    }
  }

  function formatCurrencyBRL(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }


})