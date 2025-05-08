let vergunningen = [
    {
        id: Date.now(),
        klantnaam: 'Voorbeeld B.V.',
        vervaldatum: '2025-12-01',
        taal: 'NL',
        waarschuwing: 7
    }
];

function toevoegenVergunning() {
    const klantnaam = document.getElementById('klantnaam').value;
    const vervaldatum = document.getElementById('vervaldatum').value;
    const taal = document.getElementById('taal').value;
    const waarschuwing = parseInt(document.getElementById('waarschuwing').value);

    if (!klantnaam || !vervaldatum) {
        alert('Vul alle velden in.');
        return;
    }

    const vergunning = {
        id: Date.now(),
        klantnaam,
        vervaldatum,
        taal,
        waarschuwing
    };

    vergunningen.push(vergunning);
    updateTabel();
    document.getElementById('klantnaam').value = '';
    document.getElementById('vervaldatum').value = '';
    document.getElementById('taal').value = 'NL';
    document.getElementById('waarschuwing').value = 7;

    document.getElementById('emailVoorbeeld').value = `Beste ${klantnaam}, uw vergunning verloopt op ${formatDateNL(vervaldatum)}. Neem tijdig contact met ons op.`;
}

function updateTabel() {
    const tbody = document.querySelector('#vergunningTable tbody');
    tbody.innerHTML = '';

    const vandaag = new Date();

    vergunningen.forEach(v => {
        const vervalDate = new Date(v.vervaldatum);
        const diffDays = Math.ceil((vervalDate - vandaag) / (1000 * 60 * 60 * 24));

        let statusClass = '';
        let statusText = '';

        if (diffDays > v.waarschuwing) {
            statusClass = 'status-green';
            statusText = 'Geldig';
        } else if (diffDays > 0) {
            statusClass = 'status-orange';
            statusText = 'Gaat vervallen';
        } else {
            statusClass = 'status-red';
            statusText = 'Vervallen';
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${v.klantnaam}</td>
            <td>${formatDateNL(v.vervaldatum)}</td>
            <td class="${statusClass}">${statusText}</td>
            <td>
                <button onclick="toonEmailVoorbeeld(${v.id})">Email klant (${v.taal})</button>
                <button onclick="bewerkVergunning(${v.id})">Bewerk</button>
                <button onclick="verwijderVergunning(${v.id})">Verwijder</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function formatDateNL(dateString) {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
}

function toonEmailVoorbeeld(id) {
    const vergunning = vergunningen.find(v => v.id === id);
    let boodschap = '';

    if (vergunning.taal === 'NL') {
        boodschap = `Beste ${vergunning.klantnaam}, uw vergunning verloopt op ${formatDateNL(vergunning.vervaldatum)}. Neem tijdig contact met ons op.`;
    } else if (vergunning.taal === 'EN') {
        boodschap = `Dear ${vergunning.klantnaam}, your permit expires on ${formatDateNL(vergunning.vervaldatum)}. Please contact us in time.`;
    } else if (vergunning.taal === 'DE') {
        boodschap = `Sehr geehrter ${vergunning.klantnaam}, Ihre Genehmigung läuft am ${formatDateNL(vergunning.vervaldatum)} ab. Bitte kontaktieren Sie uns rechtzeitig.`;
    }

    const aangepasteBoodschap = prompt('Bekijk/bewerk het e-mailbericht hieronder en klik op OK om te verzenden:', boodschap);
    if (aangepasteBoodschap !== null) {
        alert('E-mail verzonden:\n\n' + aangepasteBoodschap);
    }
}

function bewerkVergunning(id) {
    alert('Bewerkfunctie wordt later toegevoegd.');
}

function verwijderVergunning(id) {
    if (confirm('Weet je zeker dat je deze vergunning wilt verwijderen?')) {
        vergunningen = vergunningen.filter(v => v.id !== id);
        updateTabel();
    }
}

function exporteerCSV() {
    let csv = 'Klantnaam,Vervaldatum,Taal,Waarschuwing\n';
    vergunningen.forEach(v => {
        csv += `${v.klantnaam},${formatDateNL(v.vervaldatum)},${v.taal},${v.waarschuwing}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vergunningen.csv';
    a.click();
}

window.onload = updateTabel;
