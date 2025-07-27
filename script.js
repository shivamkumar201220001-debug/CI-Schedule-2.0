const apiKey = "AIzaSyBoQWKF1OjHI-rDK7BjFZHmhCyxvEx5XS8";
const sheetId = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const sheetName = "CI time";

const scheduleContainer = document.getElementById("scheduleContainer");
const searchInput = document.getElementById("searchInput");

fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
)
  .then((res) => res.json())
  .then((data) => {
    const rows = data.values;
    if (!rows || rows.length === 0) {
      scheduleContainer.innerHTML = "<p>No data found.</p>";
      return;
    }

    const headers = rows[0];
    const teacherRows = rows.slice(1);

    function renderTable(filteredRows) {
      scheduleContainer.innerHTML = "";

      filteredRows.forEach((row) => {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        headers.forEach((h) => {
          const th = document.createElement("th");
          th.textContent = h;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        const dataRow = document.createElement("tr");
        headers.forEach((_, i) => {
          const td = document.createElement("td");
          td.textContent = row[i] || "";
          dataRow.appendChild(td);
        });
        tbody.appendChild(dataRow);

        table.appendChild(thead);
        table.appendChild(tbody);
        scheduleContainer.appendChild(table);
      });
    }

    // Initial render – all teachers
    renderTable(teacherRows);

    // Search functionality
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      const filtered = teacherRows.filter((row) =>
        row[0].toLowerCase().includes(query)
      );
      renderTable(filtered);
    });
  })
  .catch((error) => {
    scheduleContainer.innerHTML = "<p>Error loading schedule.</p>";
    console.error("Error:", error);
  });
