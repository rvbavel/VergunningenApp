# Permit Management Frontend

Dit project is een eenvoudige frontend voor het beheren van vergunningen voor **Speciaal Transport Zwolle B.V.**.  
Het is volledig kant-en-klaar, zonder backend, en werkt direct in de browser met dummydata.

---

## Wat zit erin?

✅ HTML-pagina met zakelijke layout  
✅ Vergunningen invoeren, verwijderen, inline bewerken (placeholder)  
✅ Statuskleur (groen/oranje/rood) op basis van vervaldatum  
✅ E-mailvoorbeeld openen en bewerken (geen echte verzending)  
✅ Exportfunctie naar CSV  
✅ Logo bovenaan en footer met “Ontwikkeld door René van Bavel”

---

## Bestanden

- `index.html` → hoofdpagina  
- `styles.css` → stijlen  
- `script.js` → logica  
- `logo.png` → jouw bedrijfslogo (niet bijgevoegd, zelf plaatsen)

---

## Installatie

1️⃣ Download alle bestanden en plaats ze in één map, bijvoorbeeld `permit-management-frontend`.

2️⃣ Zorg dat je eigen logo (`logo.png`) in dezelfde map staat.

3️⃣ Dubbelklik op `index.html` → de pagina opent in je browser.

Je hoeft geen server of database te installeren: alles draait volledig lokaal.

---

## Gebruik

- Voeg vergunningen toe met klantnaam, vervaldatum, taal, en waarschuwingsperiode.
- Bekijk de tabel met kleurcodes:
    - Groen = geldig
    - Oranje = gaat vervallen
    - Rood = verlopen
- Klik op **Email klant** → voorbeeldbericht verschijnt (kan aangepast worden).
- Klik op **Exporteer als CSV** → downloadt alle data als spreadsheetbestand.

---

## Opmerkingen

- De bewerkfunctie is nog een placeholder.
- Echte e-mailverzending is niet ingebouwd, maar kan later worden toegevoegd.
- Data wordt alleen tijdelijk in het geheugen opgeslagen (gaat verloren als je de pagina sluit).

---

## Ontwikkeld door

Speciaal Transport Zwolle B.V.  
Ontwikkeld door René van Bavel
