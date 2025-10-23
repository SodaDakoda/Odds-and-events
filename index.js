let numbers = []; //number bank
let oddNumbers = []; //odd numbers
let evenNumbers = []; //even numbers

function addNumber(n) {
  numbers.push(n);
  render();
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
      <label>
      
      <input name="num" type="number" min="1" />
      </label>
      <button>Add Number</button>
    `;
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData($form);
    const n = Number(data.get("num"));
    if (!isNaN(n)) {
      addNumber(n);
      $form.reset();
    }
  });

  return $form;
}

function NumberBank() {
  const $div = document.createElement("div");
  $div.innerHTML = `
    <p>Number Bank: ${numbers.join(", ")}</p>
    <p>Odd Numbers: ${oddNumbers.join(", ")}</p>
    <p>Even Numbers: ${evenNumbers.join(", ")}</p>
  `;
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
    if (n % 2 === 0) {
      evenNumbers.push(n);
    } else {
      oddNumbers.push(n);
    }
  }
  render();
}

function SortAllButton() {
  const $button = document.createElement("button");
  $button.textContent = "Sort All";
  $button.addEventListener("click", sortAll);
  return $button;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = "";
  $app.append(NumberForm());
  $app.append(SortButton());
  $app.append(SortAllButton());
  $app.append(NumberBank());
}

render();
