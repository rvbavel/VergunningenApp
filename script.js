// script.js voor vergunningen.html

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, Timestamp
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhYR1OuoDaIFeN4-JITfyTdsleadSMTNo",
  authDomain: "vergunningenapp-8455e.firebaseapp.com",
  projectId: "vergunningenapp-8455e",
  storageBucket: "vergunningenapp-8455e.appspot.com",
  messagingSenderId: "882694266288",
  appId: "1:882694266288:web:832a85a80dea1b6190ca75"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Functie om vergunning op te slaan
window.opslaanVergunning = async function () {
  const klantnaam = document.getElementById("klantnaam").value.trim();
  const email = document.getElementById("email_klant").value.trim();
  const vergunningsnummer = document.getElementById("vergunningsnummer").value.trim();
  const vervaldatum = document.getElementById("vervaldatum").value;
  const drempel = parseInt(document.getElementById("waarschuwingsdrempel").value.trim(), 10);
  const taal = document.getElementById("taal").value;

  if (!klantnaam || !email || !vergunningsnummer || !vervaldatum || isNaN(drempel)) {
    alert("Vul alle velden in om een vergunning op te slaan.");
    return;
  }

  try {
    await addDoc(collection(db, "vergunningen"), {
      klantnaam,
      email,
      vergunningsnummer,
      vervaldatum,
      drempel,
      taal,
      timestamp: Timestamp.now()
    });
    alert("Vergunning opgeslagen.");
    laadVergunningen();
  } catch (err) {
    console.error("Fout bij opslaan:", err);
    alert("Er ging iets mis bij het opslaan van de vergunning.");
  }
};

// Format datum van yyyy-mm-dd naar dd-mm-yyyy
function formatDatum(datumString) {
  const d = new Date(datumString + "T00:00:00");
  const dag = String(d.getDate()).padStart(2, '0');
  const maand = String(d.getMonth() + 1).padStart(2, '0');
  const jaar = d.getFullYear();
  return `${dag}-${maand}-${jaar}`;
}

// Bereken status op basis van drempel
function berekenStatus(vervaldatum, drempel) {
  const nu = new Date();
  const verval = new Date(vervaldatum + "T00:00:00");
  const msVerschil = verval - nu;
  const dagenVerschil = Math.ceil(msVerschil / (1000 * 60 * 60 * 24));

  if (dagenVerschil < 0) return { tekst: "Vervallen", klasse: "status-vervallen" };
  if (dagenVerschil <= drempel) return { tekst: "Gaat verlopen", klasse: "status-waarschuwing" };
  return { tekst: "Geldig", klasse: "status-geldig" };
}

// Verwijder vergunning
window.verwijderVergunning = async function (docId) {
  if (confirm("Weet je zeker dat je deze vergunning wilt verwijderen?")) {
    try {
      await deleteDoc(doc(db, "vergunningen", docId));
      alert("Vergunning verwijderd.");
      laadVergunningen();
    } catch (err) {
      console.error("Fout bij verwijderen:", err);
    }
  }
};

// Maak e-mailtekst op basis van taal
function genereerEmailBody(data) {
  const bodyNl = `Geachte klant,\n\nUw vergunning met nummer ${data.vergunningsnummer} vervalt binnenkort.\n\nZullen wij voor u een verlenging aanvragen?\n\nMet vriendelijke groet,\n\nTeam Speciaal Transport Zwolle B.V.\nKoelmansstraat 81a\nNL- 7722 LW Dalfsen\nTel: +31 38 250 0020\ninfo@speciaaltransportzwolle.nl\nwww.speciaaltransportzwolle.nl\n\nKVK: 90164652\nBTW nummer: NL865228413B01\nIBAN: NL98RABO0355344017\nBIC: RABONL2U`;
  const bodyEn = `Dear customer,\n\nYour permit number ${data.vergunningsnummer} is about to expire.\n\nWould you like us to apply for an extension on your behalf?\n\nBest regards,\n\nTeam Speciaal Transport Zwolle B.V.\nKoelmansstraat 81a\nNL- 7722 LW Dalfsen\nTel: +31 38 250 0020\ninfo@speciaaltransportzwolle.nl\nwww.speciaaltransportzwolle.nl\n\nKVK: 90164652\nVAT: NL865228413B01\nIBAN: NL98RABO0355344017\nBIC: RABONL2U`;
  const bodyDe = `Sehr geehrter Kunde,\n\nIhre Genehmigung mit der Nummer ${data.vergunningsnummer} läuft bald ab.\n\nMöchten Sie, dass wir eine Verlängerung für Sie beantragen?\n\nMit freundlichen Grüßen,\n\nTeam Speciaal Transport Zwolle B.V.\nKoelmansstraat 81a\nNL- 7722 LW Dalfsen\nTel: +31 38 250 0020\ninfo@speciaaltransportzwolle.nl\nwww.speciaaltransportzwolle.nl\n\nKVK: 90164652\nUSt-ID: NL865228413B01\nIBAN: NL98RABO0355344017\nBIC: RABONL2U`;

  switch (data.taal) {
    case "en": return bodyEn;
    case "de": return bodyDe;
    default: return bodyNl;
  }
}

// Laad alle vergunningen
async function laadVergunningen() {
  const tbody = document.querySelector("#vergunningenTable tbody");
  tbody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "vergunningen"));
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const status = berekenStatus(data.vervaldatum, data.drempel);
      const body = encodeURIComponent(genereerEmailBody(data));
      const datumFormatted = formatDatum(data.vervaldatum);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.klantnaam}</td>
        <td>${data.vergunningsnummer}</td>
        <td>${datumFormatted}</td>
        <td class="${status.klasse}">${status.tekst}</td>
        <td>
          <button class="primary-btn small" onclick="verwijderVergunning('${docSnap.id}')">Verwijderen</button>
          <a class="primary-btn small" href="mailto:${data.email}?subject=Vergunning%20${data.vergunningsnummer}&body=${body}">✉️ E-mail</a>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Fout bij laden vergunningen:", err);
  }
}

// Starten bij laden
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      laadVergunningen();
    } else {
      window.location.href = "index.html";
    }
  });
});
