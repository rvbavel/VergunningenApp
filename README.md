# VMSbeheer

**VMSbeheer** is een professioneel webgebaseerd systeem voor het beheren van transportvergunningen, ontheffingen en begeleidingen. Het systeem bevat toegangscontrole via Firebase Authentication, Firestore-database voor opslag, PDF-export, statistieken en gebruikersbeheer.

---

## 🚀 Functionaliteiten

### ✅ Gebruikersbeheer
- Inloggen / registreren via Firebase Auth
- Goedkeuring door beheerder vereist
- Rollen: gebruiker / beheerder

### ✅ Vergunningen
- Inboeken van vergunningen met vervaldatum en klantgegevens
- Automatische berekening van status (geldig, verlopen, waarschuwing)
- Mogelijkheid tot verzenden van e-mail aan klanten

### ✅ Begeleidingenrapport
- Invoer van transportdetails en prijzen
- Automatische berekening van marge
- PDF-generatie van rapport
- Validatie op velden + rijen vereist

### ✅ Ontheffingenrapport
- Invoer van ontheffingsaanvragen
- Veldvalidatie + bewerkingsoptie
- Opslag in Firestore per gebruiker

### ✅ Statistieken
- Margeoverzicht
- Maandelijkse trendgrafiek
- Jaar- en gebruikerfilter
- Begeleiding + ontheffing gecombineerd

### ✅ Vervaloverzicht
- Overzicht van vergunningen die binnenkort verlopen
- Automatische kleuraanduiding (groen, geel, rood)
- Actieknop om e-mail te sturen naar de klant

---

## 📁 Mappenstructuur (aanbevolen)

```
/index.html
/dashboard.html
/gebruikersbeheer.html
/vergunningen.html
/verval.html
/begeleidingenrapport.html
/ontheffingenrapport.html
/statistieken.html
/transportbegeleiding.html

/js/
  firebase-config.js
  script.js
  begeleidingen-berekening.js
  ontheffingenrapport_validatie.js
  statistieken.js

/assets/
  logo.png
```

---

## 🧩 Technologieën

- HTML + Tailwind CSS
- JavaScript (modulair)
- Firebase Authentication
- Firestore Database
- jsPDF + autotable (PDF)
- Chart.js (grafieken)

---

## 🔐 Beveiliging

- Alleen goedgekeurde gebruikers hebben toegang
- Beheerder bepaalt rol en toegang
- Firebase Security Rules aanbevolen voor Firestore bescherming

---

## ⚙️ Installatie / Gebruik

1. **Firebase project opzetten**
   - Maak project aan via Firebase Console
   - Activeer Authentication (Email/Password)
   - Activeer Firestore Database (region: `europe-west4`)
   - Voeg een `users` collectie toe met velden:
     - `email`, `approved: false`, `role: "gebruiker"`, `voornaam`

2. **Deploy**
   - Upload bestanden naar Firebase Hosting, GitHub Pages of een eigen server
   - Zorg dat Firebase-config klopt in `firebase-config.js`

3. **Start**
   - Ga naar `index.html` en registreer je eerste gebruiker
   - Log in als beheerder en keur andere gebruikers goed via `gebruikersbeheer.html`

---

## 🧑‍💼 Auteur

**René van Bavel**  
[https://vmsbeheer.nl](https://vmsbeheer.nl)

© 2025 VMSbeheer.nl
