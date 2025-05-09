let vergunningen = [];

function toevoegenVergunning() {
    const klantnaam = document.getElementById('klantnaam').value;
    const vergunningsnummer = document.getElementById('vergunningsnummer').value;
    const vervaldatum = document.getElementById('vervaldatum').value;
    const taal = document.getElementById('taal').value;
    const waarschuwing = parseInt(document.getElementById('waarschuwing').value);

    if (!klantnaam || !vergunningsnummer || !vervaldatum) {
        alert('Vul alle velden in.');
        return;
    }

    const vergunning = {
        id: Date.now(),
        klantnaam,
        vergunningsnummer,
        vervaldatum,
        taal,
        waarschuwing,
        aangeschreven: false
    };

    vergunningen.push(vergunning);
    updateTabel();

    document.getElementById('klantnaam').value = '';
    document.getElementById('vergunningsnummer').value = '';
    document.getElementById('vervaldatum').value = '';
    document.getElementById('taal').value = 'NL';
    document.getElementById('waarschuwing').value = 7;
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
            <td>${v.vergunningsnummer}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>
                <button onclick="stuurEmail(${v.id})">E-mail klant</button>
                <button onclick="bewerkVergunning(${v.id})">Bewerk</button>
                <button onclick="verwijderVergunning(${v.id})">Verwijder</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function stuurEmail(id) {
    const vergunning = vergunningen.find(v => v.id === id);
    const emailBody = `Beste ${vergunning.klantnaam},\n\nUw vergunning ${vergunning.vergunningsnummer} verloopt op ${formatDateNL(vergunning.vervaldatum)}.\n\nMet vriendelijke groet,\nSpeciaal Transport Zwolle B.V.`;
    const mailtoLink = `mailto:?subject=Vergunning melding&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    vergunning.aangeschreven = true;
    updateTabel();
}

function bewerkVergunning(id) {
    alert('Bewerkfunctie volgt later.');
}

function verwijderVergunning(id) {
    if (confirm('Weet je zeker dat je deze vergunning wilt verwijderen?')) {
        vergunningen = vergunningen.filter(v => v.id !== id);
        updateTabel();
    }
}

function exporteerCSV() {
    let csv = 'Klantnaam,Vergunningsnummer,Vervaldatum,Taal,Waarschuwing\n';
    vergunningen.forEach(v => {
        csv += `${v.klantnaam},${v.vergunningsnummer},${v.vervaldatum},${v.taal},${v.waarschuwing}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vergunningen.csv';
    a.click();
}

function formatDateNL(dateStr) {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

window.onload = updateTabel;
