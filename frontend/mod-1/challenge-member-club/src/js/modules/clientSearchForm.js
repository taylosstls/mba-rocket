// modules/clientSearchForm.js
import ClientInfo from '../../services/client-info.js';

import MaskInput from '../utils/maskInput.js';
import Confetti from '../utils/confetti.js';

import { updateClientName, updateClientSince, updateCutHistory, updateFidelityGrid, updateFidelityCard } from './inputsUpdate.js';

const form = document.querySelector('.search-client');
const input = document.querySelector('.search-client #client-id');
const button = document.querySelector('.search-client button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const clientDetails = await ClientInfo({ id: data['client-id'] });

    // Limpar campo de input
    input.value = '';

    // Atualizar o DOM com os dados do cliente
    updateClientName(clientDetails.name);
    updateClientSince(clientDetails.clientSince);
    updateCutHistory(clientDetails.appointmentHistory, clientDetails.loyaltyCard.totalCuts);
    updateFidelityGrid(clientDetails.loyaltyCard.totalCuts);
    updateFidelityCard(clientDetails.loyaltyCard.cutsRemaining, clientDetails.loyaltyCard.cutsNeeded, clientDetails.loyaltyCard.totalCuts);

    // Confetti para comemorar se necessário
    if (clientDetails.loyaltyCard.totalCuts === 10) {
      Confetti();
    }

  } catch (error) {
    console.error('Erro ao buscar informações do cliente:', error);
  }
});

input.addEventListener('input', (event) => {
  const maskedValue = MaskInput(event.target.value);
  event.target.value = maskedValue;

  // Verifica se o valor contém exatamente 15 caracteres (contando os traços)
  button.disabled = maskedValue.length !== 15;
});
