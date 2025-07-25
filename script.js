const apiKey = "AIzaSyBoQWKF1OjHI-rDK7BjFZHmhCyxvEx5XS8";
const sheetId = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const sheetName = "CI time";

async function fetchSchedule() {
  const name = document.getElementById("teacherName").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // debugging

    const rows = data.values;
    if (!rows || rows.length === 0) {
      resultDiv.innerHTML = "<p class='message'>No data found in sheet.</p>";
      return;
    }

    const headers = rows[0];
    const matched = rows.find((row, i) => i !== 0 && row[0]?.toLowerCase() === name);

    if (matched) {
      let table = "<table><tr>";
      headers.forEach(h => table += `<th>${h}</th>`);
      table += "</tr><tr>";
      matched.forEach(cell => table += `<td>${cell}</td>`);
      table += "</tr></table>";
      resultDiv.innerHTML = table;
    } else {
      resultDiv.innerHTML = `<p class="message">Schedule not found. Please check your name.</p>`;
    }

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p class="message">Error fetching schedule. Try again later.</p>`;
  }
}
