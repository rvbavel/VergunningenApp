let opgeslagenRapporten = [];

function berekenOntheffingen() {
    let inkoopTotaal = 0;
    let verkoopTotaal = 0;

    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
    });

    for (let i = 1; i <= 8; i++) {
        const inkoop = parseFloat(document.getElementById(`inkoop${i}`).value) || 0;
        const verkoop = parseFloat(document.getElementById(`totaal_factuur${i}`).value) || 0;

        inkoopTotaal += inkoop;
        verkoopTotaal += verkoop;
    }

    const marge = verkoopTotaal - inkoopTotaal;

    document.getElementById('inkoop_totaal').value = formatter.format(inkoopTotaal);
    document.getElementById('verkoop_totaal').value = formatter.format(verkoopTotaal);
    document.getElementById('marge').value = formatter.format(marge);
}

// Automatisch berekenen bij input
for (let i = 1; i <= 8; i++) {
    document.getElementById(`inkoop${i}`).addEventListener('input', berekenOntheffingen);
    document.getElementById(`totaal_factuur${i}`).addEventListener('input', berekenOntheffingen);
}

function opslaanRapport() {
    const referentie4cijfers = document.getElementById('referentienummer').value.trim();
    const referentienummer = '2025.' + referentie4cijfers;
    const opdrachtgever = document.getElementById('opdrachtgever').value.trim();

    const rapport = {
        referentienummer: referentienummer,
        opdrachtgever: opdrachtgever,
        status: 'groen'
    };

    opgeslagenRapporten.push(rapport);
    updateRapportTabel();
}

function updateRapportTabel() {
    const tableBody = document.getElementById('reportsTable').querySelector('tbody');
    tableBody.innerHTML = '';

    opgeslagenRapporten.forEach((rapport, index) => {
        const row = document.createElement('tr');

        const projectCell = document.createElement('td');
        projectCell.textContent = rapport.referentienummer;
        row.appendChild(projectCell);

        const klantCell = document.createElement('td');
        klantCell.textContent = rapport.opdrachtgever;
        row.appendChild(klantCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = rapport.status === 'groen' ? 'Niet afgewerkt' : 'Afgewerkt';
        statusCell.style.color = rapport.status === 'groen' ? 'green' : 'red';
        row.appendChild(statusCell);

        const actieCell = document.createElement('td');
        const bewerkBtn = document.createElement('button');
        bewerkBtn.textContent = 'BEWERK';
        bewerkBtn.className = 'edit-btn';
        bewerkBtn.onclick = () => bewerkRapport(index);
        actieCell.appendChild(bewerkBtn);
        row.appendChild(actieCell);

        tableBody.appendChild(row);
    });
}

function bewerkRapport(index) {
    const rapport = opgeslagenRapporten[index];
    document.getElementById('referentienummer').value = rapport.referentienummer.split('.')[1];
    document.getElementById('opdrachtgever').value = rapport.opdrachtgever;

    alert(`Rapport ${rapport.referentienummer} geladen voor bewerking.`);
}
