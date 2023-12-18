function isNumPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;

  return true;
}

function getPrimesInRange(start, end) {
  const result = {};
  let totalNums = 0;
  const startTime = performance.now();

  for (let num = start; num <= end; num++) {
    totalNums += 1;
    const singleStart = performance.now();
    const isPrime = isNumPrime(num);
    const singleEnd = performance.now();

    const timeTaken = singleEnd - singleStart;

    result[num] = {
      isPrime,
      timeTaken,
    };
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  const averageTime = timeTaken / totalNums;

  return {
    result,
    timeTaken,
    averageTime,
  };
}

function handleSubmit() {
  const table1 = document.getElementById("table-1");
  const table2 = document.getElementById("table-2");
  table1.innerHTML = `
    <tr>
        <td>Number</td>
        <td>Result</td>
        <td>Time (ms)</td>
    </tr>
  `;
  table2.innerHTML = `
    <tr>
        <td>Number</td>
        <td>Result</td>
        <td>Time (ms)</td>
    </tr>
  `;

  const start = parseInt(document.getElementById("start-range").value);
  const end = parseInt(document.getElementById("end-range").value);
  const totalTimeTaken = document.getElementById("total-time-taken");
  const averageTimeTaken = document.getElementById("average-time-taken");

  if (isNaN(start) || isNaN(end) || start > end)
    return alert("Please enter valid start and end values");

  const { result, timeTaken, averageTime } = getPrimesInRange(start, end);

  totalTimeTaken.textContent = `${timeTaken.toFixed(4)} ms`;
  averageTimeTaken.textContent = `${averageTime.toFixed(4)} ms`;

  for (const [key, value] of Object.entries(result)) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.innerText = key;
    td2.innerText = value.isPrime ? "Prime" : "Normal";
    td3.innerText = value.timeTaken === 0 ? averageTime : value.timeTaken;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table1.appendChild(tr);
  }

  for (const [key, value] of Object.entries(result)) {
    if (!value.isPrime) continue;

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.innerText = key;
    td2.innerText = "Prime";
    td3.innerText = value.timeTaken === 0 ? averageTime : value.timeTaken;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table2.appendChild(tr);
  }

  document.getElementById("detail").style.display = "block";
}

const popup = document.querySelector("#popup-container div");
const detailBtn = document.getElementById("detail-btn");

detailBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("popup-container").style.display = "block";
});

popup.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  document.getElementById("popup-container").style.display = "none";
});
