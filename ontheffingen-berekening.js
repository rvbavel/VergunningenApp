
document.addEventListener('input', () => {
  const inkoopInputs = document.querySelectorAll('.form-grid-five > div:nth-child(4) input[type="number"]');
  const verkoopInputs = document.querySelectorAll('.form-grid-five > div:nth-child(5) input[type="number"]');

  let inkoopTotaal = 0;
  let verkoopTotaal = 0;

  inkoopInputs.forEach(input => {
    const waarde = parseFloat(input.value);
    if (!isNaN(waarde)) {
      inkoopTotaal += waarde;
    }
  });

  verkoopInputs.forEach(input => {
    const waarde = parseFloat(input.value);
    if (!isNaN(waarde)) {
      verkoopTotaal += waarde;
    }
  });

  const marge = verkoopTotaal - inkoopTotaal;

  const format = waarde => `€ ${waarde.toFixed(2)}`;

  document.getElementById('inkoop_totaal').value = format(inkoopTotaal);
  document.getElementById('verkoop_totaal').value = format(verkoopTotaal);
  document.getElementById('marge').value = format(marge);
});

function formatEuro(value) {
  const number = parseFloat(value);
  if (isNaN(number)) return '';
  return number.toFixed(2).replace('.', ',');
}

function parseEuroString(value) {
  return parseFloat(value.replace(',', '.').replace('€', '').trim()) || 0;
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

  document.getElementById('inkoop_totaal').value = `€ ${inkoopTotaal.toFixed(2).replace('.', ',')}`;
  document.getElementById('verkoop_totaal').value = `€ ${verkoopTotaal.toFixed(2).replace('.', ',')}`;
  document.getElementById('marge').value = `€ ${marge.toFixed(2).replace('.', ',')}`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[data-type="inkoop"], input[data-type="verkoop"]').forEach(input => {
    input.addEventListener('blur', () => {
      const bedrag = parseEuroString(input.value);
      input.value = formatEuro(bedrag);
      updateTotals();
    });
  });
  updateTotals();
});
