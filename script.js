function berekenOntheffingen() {
    const referentie4cijfers = document.getElementById('referentienummer').value.trim();
    const referentienummer = '2025.' + referentie4cijfers;

    let inkoopTotaal = 0;
    let verkoopTotaal = 0;

    const aanvraagregels = [];

    for (let i = 1; i <= 8; i++) {
        const inkoop = parseFloat(getVal(`inkoop${i}`)) || 0;
        const verkoop = parseFloat(getVal(`totaal_factuur${i}`)) || 0;

        inkoopTotaal += inkoop;
        verkoopTotaal += verkoop;

        aanvraagregels.push({
            aangevraagd_bij: getVal(`aangevraagd_bij${i}`),
            datum: getVal(`datum${i}`),
            afgegeven: getVal(`afgegeven${i}`),
            inkoop: inkoop,
            totaal_factuur: verkoop
        });
    }

    const marge = verkoopTotaal - inkoopTotaal;

    // Vul automatisch de velden in het formulier
    document.getElementById('inkoop_totaal').value = inkoopTotaal.toFixed(2);
    document.getElementById('verkoop_totaal').value = verkoopTotaal.toFixed(2);
    document.getElementById('marge').value = marge.toFixed(2);

    const data = {
        referentienummer: referentienummer,
        behandelaar: getVal('behandelaar'),
        opdrachtgever: getVal('opdrachtgever'),
        vervoerder: getVal('vervoerder'),
        referentie_klant: getVal('referentie_klant'),
        omschrijving: getVal('omschrijving'),
        opmerkingen_facturatie: getVal('opmerkingen_facturatie'),
        inkoop_totaal: inkoopTotaal,
        verkoop_totaal: verkoopTotaal,
        marge: marge,
        aanvraagregels: aanvraagregels
    };

    console.log('Ontheffingenrapport berekend:', data);
    alert('Berekening uitgevoerd. Zie console voor details.');
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}
