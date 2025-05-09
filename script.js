let vergunningen = [];

function toevoegenVergunning() {
    console.log('Start toevoegenVergunning');

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

    console.log('Nieuwe vergunning toegevoegd:', vergunning);

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
    console.log('Start updateTabel');

    const tbody = document.querySelector('#vergunningTable tbody');
    if (!tbody) {
        console.error('Kan #vergunningTable tbody niet vinden!');
        return;
    }

    tbody.innerHTML = '';

    if (vergunningen.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'Nog geen vergunningen toegevoegd.';
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

    console.log('Tabel succesvol bijgewerkt');
}

window.onload = updateTabel;
