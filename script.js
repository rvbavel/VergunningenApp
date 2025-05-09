// Functie om totaalbedragen te berekenen per pagina
function updateTotals(section) {
    // Selecteer alle inkoopprijsvelden (4e kolom) in .form-grid-five
    const inkoopInputs = section.querySelectorAll('.form-grid-five > div:nth-child(4) input[type="number"]');
    // Selecteer alle verkoopprijsvelden (5e kolom) in .form-grid-five
    const verkoopInputs = section.querySelectorAll('.form-grid-five > div:nth-child(5) input[type="number"]');

    let inkoopTotaal = 0;
    let verkoopTotaal = 0;

    // Bereken som inkoopprijzen
    inkoopInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            inkoopTotaal += value;
        }
    });

    // Bereken som verkoopprijzen
    verkoopInputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            verkoopTotaal += value;
        }
    });

    const marge = verkoopTotaal - inkoopTotaal;

    // Vul totaalvelden in met €-teken en 2 decimalen
    const inkoopField = section.querySelector('#inkoop_totaal');
    const verkoopField = section.querySelector('#verkoop_totaal');
    const margeField = section.querySelector('#marge');

    if (inkoopField) inkoopField.value = `€ ${inkoopTotaal.toFixed(2)}`;
    if (verkoopField) verkoopField.value = `€ ${verkoopTotaal.toFixed(2)}`;
    if (margeField) margeField.value = `€ ${marge.toFixed(2)}`;
}

// Luister op het hele document naar input-wijzigingen
document.addEventListener('input', function (e) {
    const section = e.target.closest('main.card');
    if (section && e.target.type === 'number') {
        updateTotals(section);
    }
});

// Navigatieknoppen (zoals in alle menu's gebruikt)
function begeleidingenRapport() {
    window.location.href = 'begeleidingenrapport.html';
}

function aanvraagTransportbegeleiding() {
    window.location.href = 'aanvraagtransportbegeleiding.html';
}
