let numbers = [];
let oddNumbers = [];
let evenNumbers = [];

function addNumber(n) {
  numbers.push(n);
  render();
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      <input name="num" type="number" min="1" placeholder="Enter a number" />
    </label>
    <button>Add Number</button>
  `;
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = Number(new FormData($form).get("num"));
    if (!isNaN(n)) {
      addNumber(n);
      $form.reset();
    }
  });
  return $form;
}

let numberSortValue = "";
let oddSortValue = "";
let evenSortValue = "";

function NumberBank() {
  const $div = document.createElement("div");
  $div.className = "number-bank";

  const numberSort = document.createElement("select");
  numberSort.innerHTML = `
    <option value="">Sort Numbers</option>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  `;
  numberSort.value = numberSortValue;

  const numberLabel = document.createElement("span");
  numberLabel.textContent = numberSortValue
    ? numberSortValue.charAt(0).toUpperCase() + numberSortValue.slice(1)
    : "";

  numberSort.addEventListener("change", (e) => {
    numberSortValue = e.target.value;
    sortBank(numbers, numberSortValue);
    numberLabel.textContent = numberSortValue
      ? numberSortValue.charAt(0).toUpperCase() + numberSortValue.slice(1)
      : "";
  });

  const oddSort = document.createElement("select");
  oddSort.innerHTML = `
    <option value="">Sort Odds</option>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  `;
  oddSort.value = oddSortValue;

  const oddLabel = document.createElement("span");
  oddLabel.textContent = oddSortValue
    ? oddSortValue.charAt(0).toUpperCase() + oddSortValue.slice(1)
    : "";

  oddSort.addEventListener("change", (e) => {
    oddSortValue = e.target.value;
    sortBank(oddNumbers, oddSortValue);
    oddLabel.textContent = oddSortValue
      ? oddSortValue.charAt(0).toUpperCase() + oddSortValue.slice(1)
      : "";
  });

  const evenSort = document.createElement("select");
  evenSort.innerHTML = `
    <option value="">Sort Evens</option>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  `;
  evenSort.value = evenSortValue;

  const evenLabel = document.createElement("span");
  evenLabel.textContent = evenSortValue
    ? evenSortValue.charAt(0).toUpperCase() + evenSortValue.slice(1)
    : "";

  evenSort.addEventListener("change", (e) => {
    evenSortValue = e.target.value;
    sortBank(evenNumbers, evenSortValue);
    evenLabel.textContent = evenSortValue
      ? evenSortValue.charAt(0).toUpperCase() + evenSortValue.slice(1)
      : "";
  });

  const bankP = document.createElement("p");
  bankP.innerHTML = `<strong>Number Bank:</strong> ${numbers.join(", ")}`;

  const oddP = document.createElement("p");
  oddP.innerHTML = `<strong>Odd Numbers:</strong> ${oddNumbers.join(", ")}`;

  const evenP = document.createElement("p");
  evenP.innerHTML = `<strong>Even Numbers:</strong> ${evenNumbers.join(", ")}`;

  $div.append(bankP, numberSort, numberLabel);
  $div.append(oddP, oddSort, oddLabel);
  $div.append(evenP, evenSort, evenLabel);

  return $div;
}
function sortFirst() {
  if (numbers.length === 0) return;

  const first = numbers.shift();

  if (first % 2 === 0) {
    evenNumbers.push(first);
  } else {
    oddNumbers.push(first);
  }

  render();
}

function SortButton() {
  const $button = document.createElement("button");
  $button.textContent = "Sort 1";

  $button.addEventListener("click", sortFirst);

  return $button;
}

function sortAll() {
  while (numbers.length > 0) {
    const n = numbers.shift();
    if (n % 2 === 0) evenNumbers.push(n);
    else oddNumbers.push(n);
  }
  render();
}

function SortAllButton() {
  const $button = document.createElement("button");
  $button.textContent = "Sort All";
  $button.addEventListener("click", sortAll);
  return $button;
}

const Num_Range = { min: 1, max: 999 };

function genNum() {
  const randomNum =
    Math.floor(Math.random() * (Num_Range.max - Num_Range.min + 1)) +
    Num_Range.min;
  numbers.push(randomNum);
  render();
}

function GenerateButton() {
  const $button = document.createElement("button");
  $button.textContent = "Generate Number";
  $button.addEventListener("click", genNum);
  return $button;
}

function clearNumbers() {
  numbers = [];
  oddNumbers = [];
  evenNumbers = [];
  render();
}

function ClearButton() {
  const $button = document.createElement("button");
  $button.textContent = "Clear All";
  $button.addEventListener("click", clearNumbers);
  return $button;
}

function sortBank(bank, order) {
  if (order === "asc") bank.sort((a, b) => a - b);
  else if (order === "desc") bank.sort((a, b) => b - a);
  render();
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = "";
  $app.append(NumberForm());
  $app.append(SortButton());
  $app.append(SortAllButton());
  $app.append(GenerateButton());
  $app.append(ClearButton());
  $app.append(NumberBank());
}

render();
