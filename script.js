function berekenOntheffingen() {
    let inkoopTotaal = 0;
    let verkoopTotaal = 0;

    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
    });

    for (let i = 1; i <= 8; i++) {
        const inkoop = parseFloat(document.getElementById(`inkoop${i}`).value) || 0;
        const verkoop = parseFloat(document.getElementById(`totaal_factuur${i}`).value) || 0;

        inkoopTotaal += inkoop;
        verkoopTotaal += verkoop;
    }

    const marge = verkoopTotaal - inkoopTotaal;

    document.getElementById('inkoop_totaal').value = formatter.format(inkoopTotaal);
    document.getElementById('verkoop_totaal').value = formatter.format(verkoopTotaal);
    document.getElementById('marge').value = formatter.format(marge);

    console.log('Berekening uitgevoerd:', {
        inkoopTotaal: inkoopTotaal,
        verkoopTotaal: verkoopTotaal,
        marge: marge
    });

    alert('Berekening uitgevoerd. Zie console voor details.');
}
