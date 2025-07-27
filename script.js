const API_KEY = "AIzaSyBCn-QeQAIMCw2FbC-knJJ3zn3_SI3KDhs";
const SHEET_ID = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const SHEET_NAME = "CI time";

async function getSchedule() {
  const name = document.getElementById("nameInput").value.trim().toLowerCase();
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rows = data.values;

    const header = rows[0];
    const match = rows.find((row, i) => i !== 0 && row[0].toLowerCase() === name);

    if (!match) {
      container.innerHTML = "<p>No schedule found for this name.</p>";
      return;
    }

    const table = document.createElement("table");

    const headRow = document.createElement("tr");
    header.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      headRow.appendChild(th);
    });
    table.appendChild(headRow);

    const dataRow = document.createElement("tr");
    match.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      dataRow.appendChild(td);
    });
    table.appendChild(dataRow);

    container.appendChild(table);
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong while loading schedule.");
  }
}
