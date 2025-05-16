function parseEuroString(value) {
  return parseFloat(value.replace(',', '.').replace('€', '').trim()) || 0;
}

function formatEuro(value) {
  return `€ ${value.toFixed(2).replace('.', ',')}`;
}

function updateTotals() {
  const inkoopInputs = document.querySelectorAll('input[data-type="inkoop"]');
  const verkoopInputs = document.querySelectorAll('input[data-type="verkoop"]');

  let inkoopTotaal = 0;
  let verkoopTotaal = 0;

  inkoopInputs.forEach(input => {
    const bedrag = parseEuroString(input.value);
    inkoopTotaal += bedrag;
  });

  verkoopInputs.forEach(input => {
    const bedrag = parseEuroString(input.value);
    verkoopTotaal += bedrag;
  });

  const marge = verkoopTotaal - inkoopTotaal;

  document.getElementById('inkoop_totaal').value = formatEuro(inkoopTotaal);
  document.getElementById('verkoop_totaal').value = formatEuro(verkoopTotaal);
  document.getElementById('marge').value = formatEuro(marge);
}

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input[data-type="inkoop"], input[data-type="verkoop"]');

  inputs.forEach(input => {
    input.addEventListener('input', updateTotals);
    input.addEventListener('blur', () => {
      const bedrag = parseEuroString(input.value);
      input.value = bedrag ? bedrag.toFixed(2).replace('.', ',') : '';
    });
  });

  updateTotals(); // Initiale berekening bij laden
});
