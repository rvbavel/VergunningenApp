// =========================
// Vergunningenbeheer (vergunningen.html)
// =========================

let vergunningen = [];

function toevoegenVergunning() {
    const klantnaam = document.getElementById('klantnaam').value.trim();
    const email = document.getElementById('email').value.trim();
    const vergunningsnummer = document.getElementById('vergunningsnummer').value.trim();
    const vervaldatum = document.getElementById('vervaldatum').value;
    const waarschuwing = parseInt(document.getElementById('waarschuwing').value);
    const ontheffingFile = document.getElementById('ontheffingPdf').files[0];

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
        waarschuwing,
        bestandNaam: ontheffingFile ? ontheffingFile.name : 'Geen bestand geselecteerd',
        aangeschreven: false
    };

    vergunningen.push(vergunning);
    updateTabel();

    document.getElementById('klantnaam').value = '';
    document.getElementById('email').value = '';
    document.getElementById('vergunningsnummer').value = '';
    document.getElementById('vervaldatum').value = '';
    document.getElementById('waarschuwing').value = 7;
    document.getElementById('ontheffingPdf').value = '';
}

function updateTabel() {
    const tbody = document.querySelector('#vergunningTable tbody');
    if (!tbody) return; // Voorkom fout als tabel niet op deze pagina staat

    tbody.innerHTML = '';

    if (vergunningen.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'Nog geen gegevens toegevoegd.';
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

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
            <td>${v.klantnaam} <br><small>${v.email}</small></td>
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
    const mailtoLink = `mailto:${vergunning.email}?subject=Vergunning melding&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    vergunning.aangeschreven = true;
    updateTabel();
}

function bewerkVergunning(id) {
    alert('Bewerkfunctie volgt later.');
}

function verwijderVergunning(id) {
    if (confirm('Weet je zeker dat je dit wilt verwijderen?')) {
        vergunningen = vergunningen.filter(v => v.id !== id);
        updateTabel();
    }
}

function exporteerCSV() {
    let csv = 'Klantnaam,E-mail,Nummer,Vervaldatum,Waarschuwing,Bestand\n';
    vergunningen.forEach(v => {
        csv += `${v.klantnaam},${v.email},${v.vergunningsnummer},${v.vervaldatum},${v.waarschuwing},${v.bestandNaam}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gegevens.csv';
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


//
// =========================
// Ontheffingenrapport (ontheffingenrapport.html)
// =========================
//

function verstuurOntheffingenRapport() {
    const data = {
        omschrijving: getVal('omschrijving'),
        referentienummer: getVal('referentienummer'),
        opdrachtgever: getVal('opdrachtgever'),
        vervoerder: getVal('vervoerder'),
        factuurprijs: getVal('factuurprijs'),
        datum: getVal('datum'),
        aangevraagd_bij: getVal('aangevraagd_bij'),
        afgegeven: getVal('afgegeven'),
        totaal_factuur: getVal('totaal_factuur'),
        inkoop: getVal('inkoop'),
        marge: getVal('marge'),
        behandelaar: getVal('behandelaar'),
        afgewerkt_door: getVal('afgewerkt_door'),
        referentie_klant: getVal('referentie_klant'),
        inkoopfacturen_aan: getVal('inkoopfacturen_aan'),
        rapport_verkoop: getVal('rapport_verkoop'),
        opmerkingen_facturatie: getVal('opmerkingen_facturatie'),
        aanvraagregels: []
    };

    const rows = document.querySelectorAll('#aanvraagTabel tr');
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length > 0) {
            const regel = {
                refnr_klant: inputs[0].value,
                vervoerder: inputs[1].value,
                klant: inputs[2].value,
                datum_aanvraag: inputs[3].value,
                doorgestuurd_gefaxt: inputs[4].value,
                prijs_per_stuk: inputs[5].value,
                instantie: inputs[6].value
            };
            data.aanvraagregels.push(regel);
        }
    });

    console.log('Verstuurde ontheffingenrapport:', data);
    alert('Ontheffingenrapport verzameld. Zie console voor details.');
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}
