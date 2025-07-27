const API_KEY = "AIzaSyBCn-QeQAIMCw2FbC-knJJ3zn3_SI3KDhs";
const SHEET_ID = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const SHEET_NAME = "CI time";

let allRows = [];
let headers = [];

async function getSchedule() {
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rows = data.values;

    headers = rows[0];
    allRows = rows.slice(1); // skip header

    renderTables(allRows);
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to load schedule.");
  }
}

function renderTables(data) {
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";

  data.forEach(row => {
    const table = document.createElement("table");
    table.classList.add("schedule-table");

    const headRow = document.createElement("tr");
    headers.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      headRow.appendChild(th);
    });
    table.appendChild(headRow);

    const dataRow = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell || "Off";
      dataRow.appendChild(td);
    });
    table.appendChild(dataRow);

    container.appendChild(table);
  });
}

function filterSchedule() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) {
    renderTables(allRows);
    return;
  }

  const filtered = allRows.filter(row => row[0].toLowerCase().includes(query));
  renderTables(filtered);
}

window.onload = getSchedule;
