function verstuurOntheffingenRapport() {
    const referentie4cijfers = document.getElementById('referentienummer').value.trim();
    const referentienummer = '2025.' + referentie4cijfers;

    const data = {
        referentienummer: referentienummer,
        omschrijving: getVal('omschrijving'),
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
                refnr_klant: inputs[0].value.trim(),
                vervoerder: inputs[1].value.trim(),
                klant: inputs[2].value.trim(),
                datum_aanvraag: inputs[3].value.trim(),
                doorgestuurd_gefaxt: inputs[4].value.trim(),
                prijs_per_stuk: inputs[5].value.trim(),
                instantie: inputs[6].value.trim()
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
