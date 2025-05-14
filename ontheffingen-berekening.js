
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
