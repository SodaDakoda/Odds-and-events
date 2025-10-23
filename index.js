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
  $div.textContent = "Numbers: " + numbers.join(", ");
  return $div;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = "";
  $app.append(NumberForm());
  $app.append(NumberBank());
}

render();
