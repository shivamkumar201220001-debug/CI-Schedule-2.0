const apiKey = "AIzaSyBoQWKF1OjHI-rDK7BjFZHmhCyxvEx5XS8";
const sheetId = "1LIXxChykzOG8cV3JN64ufIQr8iUaK9pKdvXs-6W8zfs";
const sheetName = "CI time";
const teacherSelect = document.getElementById("teacherSelect");
const scheduleContainer = document.getElementById("scheduleContainer");

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
    const teacherData = rows.slice(1);
    const teachers = [...new Set(teacherData.map((row) => row[0]))];

    teachers.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      teacherSelect.appendChild(option);
    });

    teacherSelect.addEventListener("change", () => {
      const selectedName = teacherSelect.value;
      if (!selectedName) {
        scheduleContainer.innerHTML = "";
        return;
      }

      const filtered = teacherData.filter((row) => row[0] === selectedName);
      if (filtered.length === 0) {
        scheduleContainer.innerHTML = "<p>No schedule found for this teacher.</p>";
        return;
      }

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

      filtered.forEach((row) => {
        const tr = document.createElement("tr");
        headers.forEach((_, i) => {
          const td = document.createElement("td");
          td.textContent = row[i] || "";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      scheduleContainer.innerHTML = "";
      scheduleContainer.appendChild(table);
    });
  })
  .catch((error) => {
    scheduleContainer.innerHTML = "<p>Error loading schedule.</p>";
    console.error("Error fetching data:", error);
  });
