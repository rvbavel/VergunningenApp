let vergunningen = [
    {
        id: Date.now(),
        klantnaam: 'Voorbeeld B.V.',
        email: 'klant@example.com',
        vergunningsnummer: '123-ABC',
        vervaldatum: '2025-12-01',
        taal: 'NL',
        waarschuwing: 7,
        aangeschreven: false,
        laatsteEmailDatum: null
    }
];

function toevoegenVergunning() {
    const klantnaam = document.getElementById('klantnaam').value;
    const email = document.getElementById('email').value;
    const vergunningsnummer = document.getElementById('vergunningsnummer').value;
    const vervaldatum = document.getElementById('vervaldatum').value;
    const taal = document.getElementById('taal').value;
    const waarschuwing = parseInt(document.getElementById('waarschuwing').value);

    if (!klantnaam || !email || !vergunningsnummer || !vervaldatum) {
        alert('Vul alle velden in.');
        return;
    }

    const vergunning = {
        id: Date.now(),
        klantnaam,
        email,
        vergunningsnummer,
        vervaldatum,
        taal,
        waarschuwing,
        aangeschreven: false,
        laatsteEmailDatum: null
    };

    vergunningen.push(vergunning);
    updateTabel();
    document.getElementById('klantnaam').value = '';
    document.getElementById('email').value = '';
    document.getElementById('vergunningsnummer').value = '';
    document.getElementById('vervaldatum').value = '';
    document.getElementById('taal').value = 'NL';
    document.getElementById('waarschuwing').value = 7;

    document.getElementById('emailVoorbeeld').value = `Beste ${klantnaam},\n\nUw vergunning ${vergunningsnummer} verloopt op ${formatDateNL(vervaldatum)}.\nNeem tijdig contact met ons op.\n\nMet vriendelijke groet,\nSpeciaal Transport Zwolle B.V.`;
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
            <td>${v.email}</td>
            <td>${v.vergunningsnummer}</td>
            <td>${formatDateNL(v.vervaldatum)}</td>
            <td class="${statusClass}">${statusText}</td>
            <td>${v.aangeschreven ? 'Ja' : 'Nee'}</td>
            <td>
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
    let csv = 'Klantnaam,Email,Vergunningsnummer,Vervaldatum,Taal,Waarschuwing,Aangeschreven\n';
    vergunningen.forEach(v => {
        csv += `${v.klantnaam},${v.email},${v.vergunningsnummer},${formatDateNL(v.vervaldatum)},${v.taal},${v.waarschuwing},${v.aangeschreven ? 'Ja' : 'Nee'}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vergunningen.csv';
    a.click();
}

window.onload = updateTabel;
