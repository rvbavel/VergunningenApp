let vergunningen = [];

function toevoegenVergunning() {
    const klantnaam = document.getElementById('klantnaam').value;
    const email = document.getElementById('email').value;
    const vergunningsnummer = document.getElementById('vergunningsnummer').value;
    const vervaldatum = document.getElementById('vervaldatum').value;
    const taal = document.getElementById('taal').value;
    const waarschuwing = parseInt(document.getElementById('waarschuwing').value);
    const ontheffingFile = document.getElementById('ontheffingPdf').files[0];
    const ontheffingNaam = ontheffingFile ? ontheffingFile.name : '';

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
        laatsteEmailDatum: null,
        ontheffing: ontheffingNaam
    };

    vergunningen.push(vergunning);
    updateTabel();

    document.getElementById('klantnaam').value = '';
    document.getElementById('email').value = '';
    document.getElementById('vergunningsnummer').value = '';
    document.getElementById('vervaldatum').value = '';
    document.getElementById('taal').value = 'NL';
    document.getElementById('waarschuwing').value = 7;
    document.getElementById('ontheffingPdf').value = '';

    document.getElementById('opdrachtTekst').value = `Opdracht voor transportbegeleiding:\nKlant: ${klantnaam}\nVergunning: ${vergunningsnummer}\nVervaldatum: ${formatDateNL(vervaldatum)}\n\nGraag transportbegeleiding regelen.`;
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
            <td>${formatDateNL(v.vervaldatum)}</td>
            <td class="${statusClass}">${statusText}</td>
            <td>${v.aangeschreven ? 'Ja' : 'Nee'}</td>
            <td>
                <button onclick="stuurEmail(${v.id})">Email klant</button>
                <button onclick="bewerkVergunning(${v.id})">Bewerk</button>
                <button onclick="verwijderVergunning(${v.id})">Verwijder</button>
                <button onclick="toonOntheffing('${v.ontheffing}')">Bekijk ontheffing</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function stuurEmail(id) {
    const vergunning = vergunningen.find(v => v.id === id);
    let boodschap = '';

    if (vergunning.taal === 'NL') {
        boodschap = `Beste ${vergunning.klantnaam},\n\nUw vergunning ${vergunning.vergunningsnummer} verloopt op ${formatDateNL(vergunning.vervaldatum)}.\nNeem tijdig contact met ons op.\n\nMet vriendelijke groet,\nSpeciaal Transport Zwolle B.V.`;
    } else if (vergunning.taal === 'EN') {
        boodschap = `Dear ${vergunning.klantnaam},\n\nYour permit ${vergunning.vergunningsnummer} expires on ${formatDateNL(vergunning.vervaldatum)}.\nPlease contact us in time.\n\nBest regards,\nSpeciaal Transport Zwolle B.V.`;
    } else if (vergunning.taal === 'DE') {
        boodschap = `Sehr geehrter ${vergunning.klantnaam},\n\nIhre Genehmigung ${vergunning.vergunningsnummer} läuft am ${formatDateNL(vergunning.vervaldatum)} ab.\nBitte kontaktieren Sie uns rechtzeitig.\n\nMit freundlichen Grüßen,\nSpeciaal Transport Zwolle B.V.`;
    }

    const onderwerp = 'Uw vergunning bij Speciaal Transport Zwolle B.V.';
    const mailtoLink = `mailto:${vergunning.email}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(boodschap)}`;

    window.location.href = mailtoLink;

    vergunning.laatsteEmailDatum = new Date().toISOString();
    vergunning.aangeschreven = true;
    updateTabel();
}

function toonOntheffing(bestandsnaam) {
    if (bestandsnaam) {
        alert(`Ontheffing bestand: ${bestandsnaam}`);
    } else {
        alert('Er is geen ontheffing toegevoegd.');
    }
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
    let csv = 'Klantnaam,Vergunningsnummer,Vervaldatum,Taal,Waarschuwing,Aangeschreven,Ontheffing\n';
    vergunningen.forEach(v => {
        csv += `${v.klantnaam},${v.vergunningsnummer},${formatDateNL(v.vervaldatum)},${v.taal},${v.waarschuwing},${v.aangeschreven ? 'Ja' : 'Nee'},${v.ontheffing}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vergunningen.csv';
    a.click();
}

window.onload = updateTabel;
