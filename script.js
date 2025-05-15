// script.js voor begeleidingenrapport.html

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

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

let bewerkId = null;

// Bereken totaalbedragen
function updateTotals() {
  const inkoopInputs = document.querySelectorAll('.form-grid-seven > div:nth-child(6) input');
  const verkoopInputs = document.querySelectorAll('.form-grid-seven > div:nth-child(7) input');

  let inkoopTotaal = 0;
  let verkoopTotaal = 0;

  inkoopInputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) inkoopTotaal += val;
  });

  verkoopInputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) verkoopTotaal += val;
  });

  const marge = verkoopTotaal - inkoopTotaal;
  document.getElementById('inkoop_totaal').value = `€ ${inkoopTotaal.toFixed(2)}`;
  document.getElementById('verkoop_totaal').value = `€ ${verkoopTotaal.toFixed(2)}`;
  document.getElementById('marge').value = `€ ${marge.toFixed(2)}`;
}

// Luister naar invoerwijzigingen en bereken automatisch verkoopprijs
document.addEventListener('input', e => {
  if (e.target.closest('.form-grid-seven')) {
    const grid = e.target.closest('.form-grid-seven');
    const urenInputs = grid.children[4].querySelectorAll('input');
    const verkoopInputs = grid.children[6].querySelectorAll('input');
    urenInputs.forEach((input, index) => {
      const uren = parseFloat(input.value);
      if (!isNaN(uren)) {
        verkoopInputs[index].value = (uren * 62.5).toFixed(2);
      }
    });
    updateTotals();
  }
});

// Opslaan van rapport
async function opslaanBegeleiding() {
  const ref = document.querySelector('.split-input .prefix').textContent + document.getElementById('referentienummer').value;
  const data = {
    refnr: ref,
    behandelaar: document.getElementById('behandelaar').value,
    opdrachtgever: document.getElementById('opdrachtgever').value,
    vervoerder: document.getElementById('vervoerder').value,
    referentie: document.getElementById('referentie_klant').value,
    omschrijving: document.getElementById('omschrijving').value,
    opmerkingen: document.getElementById('opmerkingen_facturatie').value,
    regels: []
  };

  const kolommen = document.querySelectorAll('.form-grid-seven > div');
  for (let i = 0; i < 8; i++) {
    const regel = {
      firma: kolommen[0].querySelectorAll('input')[i]?.value || "",
      datum: kolommen[1].querySelectorAll('input')[i]?.value || "",
      van: kolommen[2].querySelectorAll('input')[i]?.value || "",
      naar: kolommen[3].querySelectorAll('input')[i]?.value || "",
      uren: kolommen[4].querySelectorAll('input')[i]?.value || "",
      inkoop: kolommen[5].querySelectorAll('input')[i]?.value || "",
      verkoop: kolommen[6].querySelectorAll('input')[i]?.value || ""
    };
    data.regels.push(regel);
  }

  try {
    if (bewerkId) {
      await updateDoc(doc(db, 'begeleidingen', bewerkId), data);
      bewerkId = null;
    } else {
      await addDoc(collection(db, 'begeleidingen'), data);
    }
    alert("Opgeslagen.");
    laadOpdrachten();
  } catch (err) {
    console.error("Fout bij opslaan begeleiding:", err);
    alert("Fout bij opslaan begeleiding: " + err.message);
  }
}

// Koppel opslaan knop
document.getElementById("btnOpslaan").addEventListener("click", opslaanBegeleiding);

// Laad opdrachten in overzichtstabel
async function laadOpdrachten() {
  const tbody = document.querySelector('#opdrachtenTabel tbody');
  if (!tbody) return;
  tbody.innerHTML = "";
  const snapshot = await getDocs(collection(db, 'begeleidingen'));
  snapshot.forEach(docSnap => {
    const d = docSnap.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${d.refnr}</td>
      <td>${d.opdrachtgever}</td>
      <td><button onclick="bewerkOpdracht('${docSnap.id}')">Bewerk opdracht</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Bewerken van bestaande opdracht
window.bewerkOpdracht = async function (id) {
  const docSnap = await getDoc(doc(db, 'begeleidingen', id));
  if (docSnap.exists()) {
    const d = docSnap.data();
    bewerkId = id;
    document.getElementById('referentienummer').value = d.refnr.split('.')[1] || "";
    document.getElementById('behandelaar').value = d.behandelaar || "";
    document.getElementById('opdrachtgever').value = d.opdrachtgever || "";
    document.getElementById('vervoerder').value = d.vervoerder || "";
    document.getElementById('referentie_klant').value = d.referentie || "";
    document.getElementById('omschrijving').value = d.omschrijving || "";
    document.getElementById('opmerkingen_facturatie').value = d.opmerkingen || "";

    const kolommen = document.querySelectorAll('.form-grid-seven > div');
    for (let i = 0; i < 8; i++) {
      kolommen[0].querySelectorAll('input')[i].value = d.regels[i]?.firma || "";
      kolommen[1].querySelectorAll('input')[i].value = d.regels[i]?.datum || "";
      kolommen[2].querySelectorAll('input')[i].value = d.regels[i]?.van || "";
      kolommen[3].querySelectorAll('input')[i].value = d.regels[i]?.naar || "";
      kolommen[4].querySelectorAll('input')[i].value = d.regels[i]?.uren || "";
      kolommen[5].querySelectorAll('input')[i].value = d.regels[i]?.inkoop || "";
      kolommen[6].querySelectorAll('input')[i].value = d.regels[i]?.verkoop || "";
    }

    updateTotals();
  }
}

// Bij laden van de pagina
window.addEventListener('DOMContentLoaded', () => {
  updateTotals();
  laadOpdrachten();
});
