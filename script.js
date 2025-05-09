function verstuurOntheffingenRapport() {
    const referentie4cijfers = document.getElementById('referentienummer').value.trim();
    const referentienummer = '2025.' + referentie4cijfers;

    const data = {
        referentienummer: referentienummer,
        behandelaar: getVal('behandelaar'),
        opdrachtgever: getVal('opdrachtgever'),
        vervoerder: getVal('vervoerder'),
        referentie_klant: getVal('referentie_klant'),
        omschrijving: getVal('omschrijving'),
        opmerkingen_facturatie: getVal('opmerkingen_facturatie'),
        aanvraagregels: []
    };

    for (let i = 1; i <= 8; i++) {
        data.aanvraagregels.push({
            aangevraagd_bij: getVal(`aangevraagd_bij${i}`),
            datum: getVal(`datum${i}`),
            afgegeven: getVal(`afgegeven${i}`),
            inkoop: getVal(`inkoop${i}`),
            totaal_factuur: getVal(`totaal_factuur${i}`)
        });
    }

    console.log('Verstuurde ontheffingenrapport:', data);
    alert('Ontheffingenrapport verzameld. Zie console voor details.');
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}
