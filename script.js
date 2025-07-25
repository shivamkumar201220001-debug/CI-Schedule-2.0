const API_KEY = "AIzaSyBoQWKF1OjHI-rDK7BjFZHmhCyxvEx5XS8";
const SHEET_ID = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const SHEET_NAME = "CI time";

async function loadSchedule() {
  const inputName = document.getElementById("teacherNameInput").value.trim().toLowerCase();
  if (!inputName) return alert("Please enter your name.");

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rows = data.values;

    const headers = rows[0];
    const teacherData = rows.filter(row => row[0] && row[0].toLowerCase() === inputName);

    if (teacherData.length === 0) {
      alert("No schedule found for this name. Please check spelling.");
      return;
    }

    document.getElementById("teacherTitle").innerText = "Schedule for " + teacherData[0][0];
    generateTable(headers, teacherData);
    document.getElementById("scheduleBox").classList.remove("hidden");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to load schedule. Try again later.");
  }
}

function generateTable(headers, data) {
  const table = document.getElementById("scheduleTable");
  table.innerHTML = "";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.innerText = header;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  data.forEach(row => {
    const tr = document.createElement("tr");
    headers.forEach((_, i) => {
      const td = document.createElement("td");
      td.innerText = row[i] || "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}
