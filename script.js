const expenseForm = document.getElementById("ex-form");
const expenseList = document.getElementById("expense-list");
const balance = document.getElementById("balance");

let savedExpenses = localStorage.getItem("expenses");
let expenses = savedExpenses ? JSON.parse(savedExpenses) : [];

function showBalance() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  balance.textContent = "Total Balance: ₹" + total;
}

function showExpenses() {
  expenseList.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) {
    const li = document.createElement("li");
    li.textContent = expenses[i].name + ": ₹" + expenses[i].amount;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      deleteExpense(i);
    };

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
  }
  showBalance();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("expense-name").value;
  const amount = parseInt(document.getElementById("expense-amount").value);

  const newExpense = { name: name, amount: amount };
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  showExpenses();
  expenseForm.reset();
});

showExpenses();
