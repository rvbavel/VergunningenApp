let opgeslagenVergunningen = [];

function opslaanVergunning() {
    const klantnaam = document.getElementById('klantnaam').value.trim();
    const vergunningsnummer = document.getElementById('vergunningsnummer').value.trim();
    const vervaldatum = document.getElementById('vervaldatum').value;
    const status = document.getElementById('status').value;

    if (!klantnaam || !vergunningsnummer || !vervaldatum) {
        alert('Vul alle velden in voordat je opslaat.');
        return;
    }

    const vergunning = {
        klantnaam: klantnaam,
        vergunningsnummer: vergunningsnummer,
        vervaldatum: vervaldatum,
        status: status
    };

    opgeslagenVergunningen.push(vergunning);
    updateVergunningenTabel();
}

function updateVergunningenTabel() {
    const tableBody = document.getElementById('vergunningenTable').querySelector('tbody');
    tableBody.innerHTML = '';

    opgeslagenVergunningen.forEach((vergunning, index) => {
        const row = document.createElement('tr');

        const klantCell = document.createElement('td');
        klantCell.textContent = vergunning.klantnaam;
        row.appendChild(klantCell);

        const nummerCell = document.createElement('td');
        nummerCell.textContent = vergunning.vergunningsnummer;
        row.appendChild(nummerCell);

        const datumCell = document.createElement('td');
        datumCell.textContent = formatDatumNL(vergunning.vervaldatum);
        row.appendChild(datumCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = vergunning.status === 'groen' ? 'Niet verlopen' : 'Verlopen';
        statusCell.style.color = vergunning.status === 'groen' ? 'green' : 'red';
        row.appendChild(statusCell);

        const actieCell = document.createElement('td');
        const bewerkBtn = document.createElement('button');
        bewerkBtn.textContent = 'BEWERK';
        bewerkBtn.className = 'edit-btn';
        bewerkBtn.onclick = () => bewerkVergunning(index);
        actieCell.appendChild(bewerkBtn);
        row.appendChild(actieCell);

        tableBody.appendChild(row);
    });
}

function bewerkVergunning(index) {
    const vergunning = opgeslagenVergunningen[index];
    document.getElementById('klantnaam').value = vergunning.klantnaam;
    document.getElementById('vergunningsnummer').value = vergunning.vergunningsnummer;
    document.getElementById('vervaldatum').value = vergunning.vervaldatum;
    document.getElementById('status').value = vergunning.status;

    alert(`Vergunning ${vergunning.vergunningsnummer} geladen voor bewerking.`);
}

function formatDatumNL(dateString) {
    const date = new Date(dateString);
    const dag = String(date.getDate()).padStart(2, '0');
    const maand = String(date.getMonth() + 1).padStart(2, '0');
    const jaar = date.getFullYear();
    return `${dag}-${maand}-${jaar}`;
}
