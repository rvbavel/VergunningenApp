
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

window.opslaanVergunning = async function () {
  const klantnaam = document.getElementById("klantnaam").value.trim();
  const email = document.getElementById("email_klant").value.trim();
  const vergunningsnummer = document.getElementById("vergunningsnummer").value.trim();
  const vervaldatum = document.getElementById("vervaldatum").value;
  const drempel = parseInt(document.getElementById("waarschuwingsdrempel").value.trim(), 10);

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
      timestamp: Timestamp.now()
    });
    alert("Vergunning opgeslagen.");
    laadVergunningen();
  } catch (err) {
    console.error("Fout bij opslaan:", err);
    alert("Er ging iets mis bij het opslaan van de vergunning.");
  }
};

function formatDatum(datumString) {
  const d = new Date(datumString + "T00:00:00");
  const dag = String(d.getDate()).padStart(2, '0');
  const maand = String(d.getMonth() + 1).padStart(2, '0');
  const jaar = d.getFullYear();
  return `${dag}-${maand}-${jaar}`;
}

function berekenStatus(vervaldatum, drempel) {
  const nu = new Date();
  const verval = new Date(vervaldatum + "T00:00:00");
  const msVerschil = verval - nu;
  const dagenVerschil = Math.ceil(msVerschil / (1000 * 60 * 60 * 24));

  if (dagenVerschil < 0) return { tekst: "Vervallen", klasse: "status-vervallen" };
  if (dagenVerschil <= drempel) return { tekst: "Gaat verlopen", klasse: "status-waarschuwing" };
  return { tekst: "Geldig", klasse: "status-geldig" };
}

async function verwijderVergunning(docId) {
  if (confirm("Weet je zeker dat je deze vergunning wilt verwijderen?")) {
    try {
      await deleteDoc(doc(db, "vergunningen", docId));
      alert("Vergunning verwijderd.");
      laadVergunningen();
    } catch (err) {
      console.error("Fout bij verwijderen:", err);
    }
  }
}

async function laadVergunningen() {
  const tbody = document.querySelector("#vergunningenTable tbody");
  tbody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "vergunningen"));
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const status = berekenStatus(data.vervaldatum, data.drempel);
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${data.klantnaam}</td>
        <td>${data.vergunningsnummer}</td>
        <td>${formatDatum(data.vervaldatum)}</td>
        <td class="${status.klasse}">${status.tekst}</td>
        <td>
          <button class="primary-btn small" onclick="verwijderVergunning('${docSnap.id}')">Verwijderen</button>
          <a class="primary-btn small" href="mailto:${data.email}?subject=Vergunning%20${data.vergunningsnummer}" title="E-mail klant">✉️ E-mail</a>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Fout bij laden vergunningen:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      laadVergunningen();
    } else {
      window.location.href = "index.html";
    }
  });
});
