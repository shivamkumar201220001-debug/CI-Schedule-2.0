const sheetId = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const sheetName = "CI time";
const apiKey = "AIzaSyBCn-QeQAIMCw2FbC-knJJ3zn3_SI3KDhs";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
let sheetData = [];

fetch(url)
  .then(res => res.json())
  .then(data => {
    sheetData = data.values;
  });

document.getElementById("searchBox").addEventListener("input", function () {
  const search = this.value.trim().toLowerCase();
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!search || sheetData.length === 0) return;

  const headers = sheetData[0];
  const matches = sheetData.slice(1).filter(row => row[0]?.toLowerCase().includes(search));

  if (matches.length === 0) {
    result.innerHTML = "<p>No schedule found.</p>";
    return;
  }

  matches.forEach(row => {
    const ul = document.createElement("ul");
    row.forEach((cell, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${headers[idx]}:</strong> ${cell}`;
      ul.appendChild(li);
    });
    result.appendChild(ul);
  });
});
