// modules/inputsUpdate.js
export function updateClientName(name) {
  const clientNameElement = document.querySelector('.profile-area h1');
  clientNameElement.textContent = name;
}

export function updateClientSince(clientSince) {
  const clientSinceElement = document.querySelector('.profile-area .client-date');
  clientSinceElement.textContent = clientSince;
}

export function updateCutHistory(appointmentHistory, totalCuts) {
  console.log(appointmentHistory)
  // Atualizar a quantidade de cortes do histórico do cliente
  const clientCutHistoryElement = document.querySelector('.cuts-history .client-history');
  clientCutHistoryElement.textContent = `${totalCuts} ${totalCuts === 1 ? 'corte' : 'cortes'}`;

  const historyList = document.querySelector('.cuts-history .history-list');

  // Limpar conteúdo existente da lista de histórico
  historyList.innerHTML = '';

  // Função para criar um item de histórico (appointment)
  function createHistoryItem(appointment) {
    return `
      <li class="history-item grid">
        <div class="cut-content">
          <p class="subtitle-sm text-base-gray-600">${appointment.date}</p>
          <p class="text-xs text-base-gray-500">${appointment.time}</p>
        </div>
        <div class="check-content flex justify-content-center items-center">
          <i class="ph ph-seal-check"></i>
        </div>
      </li>
    `;
  }

  // Gerar o HTML para cada agendamento e adicionar à lista
  const historyItemsHTML = appointmentHistory.map(appointment => createHistoryItem(appointment)).join('');
  historyList.innerHTML = historyItemsHTML;
}

export function updateFidelityGrid(totalCuts) {
  const fidelityTextElement = document.querySelector('.fidelity-area .fidelity-text');
  if (totalCuts === 10) {
    fidelityTextElement.textContent = 'Parabéns! Seu próximo corte sairá de graça!';
  } else {
    fidelityTextElement.textContent = 'Ao fazer cortes de cabelo, o décimo sai de graça!';
  }
}

export function updateFidelityCard(cutsRemaining, cutsNeeded, totalCuts) {
  const fidelityGrid = document.querySelector('.grid-fidelity');

  // Função para criar um item de fidelidade
  function createFidelityItem(isLastItem, isActive, isFilled) {
    if (isLastItem) {
      return `
        <div class="fidelity-item gift-item">
          <i class="ph-fill ph-gift ${isActive ? 'active' : ''}"></i>
        </div>
      `;
    } else {
      return `
        <div class="fidelity-item">
          ${isFilled ? '<img src="./src/assets/confirm-icon.png" alt="Verificado" />' : ''}
        </div>
      `;
    }
  }

  // Gerar HTML para os 10 itens de fidelidade
  const fidelityItemsHTML = Array.from({ length: 10 }).map((_, index) => {
    const isLastItem = index === 9;
    const isActive = isLastItem && totalCuts === 10;
    const isFilled = index < totalCuts;

    return createFidelityItem(isLastItem, isActive, isFilled);
  }).join('');

  fidelityGrid.innerHTML = fidelityItemsHTML;

  // Atualizar as informações do cartão de fidelidade
  const cutsRemainingElement = document.querySelector('.gift-reach h3');
  cutsRemainingElement.textContent = cutsRemaining.toString();

  const progressTextElement = document.querySelector('.gift-reach .progress-text span');
  progressTextElement.textContent = totalCuts;

  const progressBar = document.querySelector('.gift-reach .progress-bar .progress');
  const progressWidth = (cutsNeeded - cutsRemaining) * 10;
  progressBar.style.width = `${progressWidth}%`;
}
