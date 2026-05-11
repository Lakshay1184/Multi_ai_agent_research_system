const runBtn = document.getElementById("runBtn");
const topicInput = document.getElementById("topicInput");
const loaderWrapper = document.getElementById("loaderWrapper");
const loaderText = document.getElementById("loaderText");
const resultsSection = document.getElementById("resultsSection");
const downloadBtn = document.getElementById("downloadBtn");

const searchContent = document.getElementById("searchContent");
const readerContent = document.getElementById("readerContent");
const writerContent = document.getElementById("writerContent");
const criticContent = document.getElementById("criticContent");

const steps = {
  search: document.getElementById("step-search"),
  reader: document.getElementById("step-reader"),
  writer: document.getElementById("step-writer"),
  critic: document.getElementById("step-critic")
};

function setStepState(stepElement, state) {

  const status = stepElement.querySelector(".step-status");

  stepElement.classList.remove("active", "done");

  status.classList.remove(
    "waiting",
    "running",
    "done-status"
  );

  if (state === "waiting") {

    status.innerText = "WAITING";
    status.classList.add("waiting");
  }

  if (state === "running") {

    stepElement.classList.add("active");

    status.innerText = "● RUNNING";

    status.classList.add("running");
  }

  if (state === "done") {

    stepElement.classList.add("done");

    status.innerText = "✓ DONE";

    status.classList.add("done-status");
  }
}

async function runPipeline() {

  const topic = topicInput.value.trim();

  if (!topic) {

    alert("Please enter a research topic first.");

    return;
  }

  // RESET
  resultsSection.classList.add("hidden");

  loaderWrapper.classList.remove("hidden");

  Object.values(steps).forEach(step => {
    setStepState(step, "waiting");
  });

  try {

    // STEP 1
    setStepState(steps.search, "running");

    loaderText.innerText =
      "🔍 Search Agent is working...";

    // API CALL
    const response = await fetch(
      "http://127.0.0.1:8000/research",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          topic: topic
        })
      }
    );

    const data = await response.json();

    // ERROR CHECK
    if (!data.success) {

      throw new Error(
        data.error || "Backend Error"
      );
    }

    // STEP DONE
    setStepState(steps.search, "done");

    searchContent.innerText =
      data.search_results;

    // STEP 2
    setStepState(steps.reader, "running");

    loaderText.innerText =
      "📄 Reader Agent is scraping resources...";

    await new Promise(resolve =>
      setTimeout(resolve, 500)
    );

    setStepState(steps.reader, "done");

    readerContent.innerText =
      data.scraped_content;

    // STEP 3
    setStepState(steps.writer, "running");

    loaderText.innerText =
      "✍️ Writer Agent is drafting report...";

    await new Promise(resolve =>
      setTimeout(resolve, 500)
    );

    setStepState(steps.writer, "done");

    writerContent.innerText =
      data.report;

    // STEP 4
    setStepState(steps.critic, "running");

    loaderText.innerText =
      "🧐 Critic Agent is reviewing report...";

    await new Promise(resolve =>
      setTimeout(resolve, 500)
    );

    setStepState(steps.critic, "done");

    criticContent.innerText =
      data.feedback;

    // SHOW RESULTS
    loaderWrapper.classList.add("hidden");

    resultsSection.classList.remove("hidden");

    // DOWNLOAD REPORT
    downloadBtn.onclick = () => {

      const blob = new Blob(
        [data.report],
        {
          type: "text/markdown"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        `research_report_${Date.now()}.md`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      URL.revokeObjectURL(url);
    };

  } catch (error) {

    console.error(error);

    loaderWrapper.classList.add("hidden");

    alert(
      "Error running pipeline:\\n\\n" +
      error.message
    );
  }
}

runBtn.addEventListener(
  "click",
  runPipeline
);

// EXAMPLE CHIPS
const chips =
  document.querySelectorAll(".chip");

chips.forEach(chip => {

  chip.addEventListener("click", () => {

    topicInput.value =
      chip.innerText;
  });

});