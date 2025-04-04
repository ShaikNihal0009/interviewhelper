document.getElementById("qaForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const jobRole = document.getElementById("jobRole").value;
  const jd = document.getElementById("jd").value;
  const background = document.getElementById("background").value;

  const loader = document.getElementById("loader");
  const output = document.getElementById("output");
  output.innerHTML = "";
  loader.classList.remove("hidden");

  try {
    const response = await fetch("http://localhost:8000/api/generate/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_role: jobRole, jd: jd, background: background }),
    });

    const data = await response.json();
    loader.classList.add("hidden");

    if (data.result) {
      const qaList = data.result.split(/\n(?=\d+\.)/); // split by numbered questions
      qaList.forEach((qa) => {
        const card = document.createElement("div");
        card.className = "qa-card";
        card.innerHTML = `<strong>${qa.trim()}</strong>`;
        output.appendChild(card);
      });
    } else {
      output.innerHTML = "<p>Error: No response received.</p>";
    }
  } catch (err) {
    loader.classList.add("hidden");
    output.innerHTML = `<p style="color:red;">Error fetching data: ${err.message}</p>`;
  }
});
