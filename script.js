let opgeslagenVergunningen = [];

function opslaanVergunning() {
    const klantnaam = document.getElementById('klantnaam').value.trim();
    const emailKlant = document.getElementById('email_klant').value.trim();
    const vergunningsnummer = document.getElementById('vergunningsnummer').value.trim();
    const vervaldatum = document.getElementById('vervaldatum').value;
    const waarschuwingsdrempel = document.getElementById('waarschuwingsdrempel').value.trim();
    const pdfInput = document.getElementById('pdf_vergunning');
    const pdfBestand = pdfInput.files.length > 0 ? pdfInput.files[0].name : 'Geen bestand geselecteerd';

    if (!klantnaam || !emailKlant || !vergunningsnummer || !vervaldatum || !waarschuwingsdrempel) {
        alert('Vul alle velden in voordat je opslaat.');
        return;
    }

    const vergunning = {
        klantnaam,
        emailKlant,
        vergunningsnummer,
        vervaldatum,
        waarschuwingsdrempel,
        pdfBestand
    };

    opgeslagenVergunningen.push(vergunning);
    updateVergunningenTabel();
}

function updateVergunningenTabel() {
    const tableBody = document.getElementById('vergunningenTable').querySelector('tbody');
    tableBody.innerHTML = '';

    opgeslagenVergunningen.forEach((vergunning, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${vergunning.klantnaam}</td>
            <td>${vergunning.emailKlant}</td>
            <td>${vergunning.vergunningsnummer}</td>
            <td>${formatDatumNL(vergunning.vervaldatum)}</td>
            <td>${vergunning.waarschuwingsdrempel} dagen</td>
            <td>${vergunning.pdfBestand}</td>
            <td><button class="edit-btn" onclick="bewerkVergunning(${index})">BEWERK</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function bewerkVergunning(index) {
    const vergunning = opgeslagenVergunningen[index];
    document.getElementById('klantnaam').value = vergunning.klantnaam;
    document.getElementById('email_klant').value = vergunning.emailKlant;
    document.getElementById('vergunningsnummer').value = vergunning.vergunningsnummer;
    document.getElementById('vervaldatum').value = vergunning.vervaldatum;
    document.getElementById('waarschuwingsdrempel').value = vergunning.waarschuwingsdrempel;

    alert(`Vergunning ${vergunning.vergunningsnummer} geladen voor bewerking.`);
}

function formatDatumNL(dateString) {
    const date = new Date(dateString);
    const dag = String(date.getDate()).padStart(2, '0');
    const maand = String(date.getMonth() + 1).padStart(2, '0');
    const jaar = date.getFullYear();
    return `${dag}-${maand}-${jaar}`;
}
