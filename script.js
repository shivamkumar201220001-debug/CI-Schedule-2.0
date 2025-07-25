const sheetId = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const apiKey = "AIzaSyBoQWKF1OjHI-rDK7BjFZHmhCyxvEx5XS8";
const sheetName = "CI time";

async function getSchedule() {
  const name = document.getElementById("nameInput").value.trim().toLowerCase();
  const outputDiv = document.getElementById("scheduleOutput");
  outputDiv.innerHTML = "Loading...";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) {
      outputDiv.innerHTML = "<p>No data found in sheet.</p>";
      return;
    }

    const headers = rows[0];
    const matchedRow = rows.find(
      (row, index) => index > 0 && row[0]?.toLowerCase() === name
    );

    if (!matchedRow) {
      outputDiv.innerHTML = "<p>No schedule found. Please check your name.</p>";
      return;
    }

    let tableHtml = "<table border='1'><tr>";
    headers.forEach((header) => {
      tableHtml += `<th>${header}</th>`;
    });
    tableHtml += "</tr><tr>";
    matchedRow.forEach((cell) => {
      tableHtml += `<td>${cell}</td>`;
    });
    tableHtml += "</tr></table>";

    outputDiv.innerHTML = tableHtml;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    outputDiv.innerHTML =
      "<p>Error loading schedule. Please try again later.</p>";
  }
}
