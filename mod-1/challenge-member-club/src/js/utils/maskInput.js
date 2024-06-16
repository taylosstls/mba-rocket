export default function MaskInput(value) {
  // Remove todos os caracteres que não são dígitos
  value = value.replace(/\D/g, '');

  // Limite o comprimento máximo da string a 12 dígitos (sem contar os traços)
  value = value.substring(0, 12);

  // Adiciona os traços conforme necessário
  const parts = [];
  for (let i = 0; i < value.length; i += 3) {
    parts.push(value.substring(i, i + 3));
  }

  return parts.join('-');
}