# 🚛 Ontheffingen Management Systeem - Speciaal Transport Zwolle B.V.

Dit systeem is ontwikkeld voor **Speciaal Transport Zwolle B.V.**  
Het is een gebruiksvriendelijk frontend-rapportagesysteem voor het registreren, beheren en exporteren van ontheffingenrapporten.

---

## 📄 Inhoud van dit project

| Bestand                  | Beschrijving                                                      |
|--------------------------|--------------------------------------------------------------------|
| `ontheffingenrapport.html` | Hoofdpagina voor het invoeren van rapportgegevens               |
| `style.css`               | Styling in lijn met de huisstijl van Speciaal Transport Zwolle B.V. |
| `script.js`               | JavaScript-functionaliteit voor formulierverwerking              |
| `print.css`               | Afdrukstijl voor PDF-export                                       |

---

## 💡 Functionaliteiten

- ✅ Invoer van referentienummer met automatisch prefix `2025.`
- ✅ Selectie van behandelaar uit vaste lijst (René, Anke, Sia, Martijn)
- ✅ Klant- en vervoerdersgegevens
- ✅ Tekstvelden voor omschrijving en opmerkingen m.b.t. facturatie
- ✅ Dynamische tabel met invoervelden voor:
  - Aangevraagd bij
  - Aanvraagdatum
  - Afgiftedatum
  - Inkoopprijs
  - Verkoopprijs
- ✅ Automatische berekening van totaalbedragen en marge
- ✅ Console-log van alle gegevens bij klikken op **VERSTUREN**
- ✅ Voorbereid op opslag in Firebase Firestore (optioneel)
- ✅ Export naar PDF met lay-outbehoud (via `html2canvas` en `jsPDF`)

---

## 🔧 Technologieën gebruikt

- HTML5 & CSS3
- JavaScript (ES6)
- [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://github.com/niklasvh/html2canvas)
- *(optioneel)* Firebase Firestore voor data-opslag

---

## 📁 Projectstructuur

VergunningenApp/
├── ontheffingenrapport.html
├── style.css
├── print.css
├── script.js
└── logo.png


---

## 🚀 Instructies

1. **Download of clone** dit project:
   ```bash
   git clone https://github.com/rvbavel/VergunningenApp.git
   cd VergunningenApp

Open ontheffingenrapport.html in een browser.

Vul het formulier in.

Klik op VERSTUREN om gegevens te testen.

Klik op OPSLAAN ALS PDF om het rapport als PDF te genereren.

📌 Toekomstige uitbreidingen
🔒 Inloggen en gebruikersbeheer

☁️ Firebase Firestore opslag & ophalen van rapporten

🧾 Toevoegen van meerdere rapporttypes (zoals begeleidingen)

🌙 Dark mode & Tailwind CSS-integratie

📊 Dashboard voor beheerders

👨‍💼 Ontwikkelaar
René van Bavel
Speciaal Transport Zwolle B.V.
📧 info@speciaaltransportzwolle.nl (voorbeeldadres)

📜 Licentie
Dit project is eigendom van René van Bavel VMSbeheer.nl en is bedoeld voor intern gebruik.

