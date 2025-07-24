
const sheetId = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const sheetName = "CI Time";
const apiKey = "AIzaSyBCn-QeQAIMCw2FbC-knJJ3zn3_SI3KDhs";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

let sheetData = [];

fetch(url)
  .then(res => res.json())
  .then(data => {
    sheetData = data.values;
    const teacherNames = [...new Set(sheetData.slice(1).map(row => row[0]))];
    const select = document.getElementById("teacherSelect");
    teacherNames.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
  });

function loadSchedule() {
  const name = document.getElementById("teacherSelect").value;
  const output = document.getElementById("scheduleOutput");
  output.innerHTML = "";

  if (!name) {
    output.textContent = "Please select a teacher.";
    return;
  }

  const headers = sheetData[0];
  const rows = sheetData.filter(row => row[0] === name);

  if (rows.length === 0) {
    output.textContent = "No schedule found for this teacher.";
    return;
  }

  const table = document.createElement("table");
  table.border = 1;
  const headerRow = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  rows.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  output.appendChild(table);
}
