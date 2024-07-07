document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const salesForm = document.getElementById("sales-box");
  const expensesForm = document.getElementById("expenses-box");
  const totalSalesValue = document.getElementById("value1");
  const totalExpensesValue = document.getElementById("value2");
  const totalBalanceValue = document.getElementById("value3");
  const salesFeedback = document.getElementById("sales-feedback");
  const expenseFeedback = document.getElementById("expense-feedback");
  const salesAndAmountValues = document.getElementById("salesAndAmountValues");
  const expensesAndAmountValues = document.getElementById(
    "expensesAndAmountValues"
  );
  const salesSection = document.querySelector(".sales");
  const expensesSection = document.querySelector(".expenses");

  let totalSales = 0;
  let totalExpenses = 0;

  // Handle sales form submission
  salesForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const salesName = document.getElementById("sales-name").value;
    const salesAmount = parseFloat(
      document.getElementById("sales-amount").value
    );

    if (salesName && !isNaN(salesAmount)) {
      totalSales += salesAmount;
      totalSalesValue.innerText = `Rs ${totalSales}`;
      salesFeedback.innerText = "Sales added successfully!";
      addSalesToList(salesName, salesAmount);
      salesForm.reset();
      salesSection.style.display = "block"; // Show sales section if it was hidden
      updateBalance();
    } else {
      salesFeedback.innerText = "Please enter valid sales details.";
    }
  });

  // Handle expenses form submission
  expensesForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(
      document.getElementById("expense-amount").value
    );

    if (expenseName && !isNaN(expenseAmount)) {
      totalExpenses += expenseAmount;
      totalExpensesValue.innerText = `Rs ${totalExpenses}`;
      expenseFeedback.innerText = "Expense added successfully!";
      addExpenseToList(expenseName, expenseAmount);
      expensesForm.reset();
      expensesSection.style.display = "block"; // Show expenses section if it was hidden
      updateBalance();
    } else {
      expenseFeedback.innerText = "Please enter valid expense details.";
    }
  });

  // Function to update balance
  function updateBalance() {
    const totalBalance = totalSales - totalExpenses;
    totalBalanceValue.innerText = `Rs ${totalBalance}`;
  }

  // Add sales to list
  function addSalesToList(name, amount) {
    const salesDiv = document.createElement("div");
    salesDiv.classList.add("sales-item");
    salesDiv.innerHTML = `
      <div class="title1-head head">
        <div class="title1-value">- ${name}</div>
      </div>
      <div class="title2-head head">
        <div class="title2-value">Rs ${amount}</div>
      </div>
      <div class="icons-head head">
        <div class="icons list-item">
          <a href="#" class="edit-icon mx-2">
            <i class="fa fa-edit"></i>
          </a>
          <a href="#" class="delete-icon">
            <i class="fa fa-trash"></i>
          </a>
        </div>
      </div>
    `;
    salesAndAmountValues.appendChild(salesDiv);

    // Add event listeners for edit and delete icons
    salesDiv
      .querySelector(".delete-icon")
      .addEventListener("click", function () {
        salesAndAmountValues.removeChild(salesDiv);
        totalSales -= amount;
        totalSalesValue.innerText = `Rs ${totalSales}`;
        updateBalance();
      });

    salesDiv.querySelector(".edit-icon").addEventListener("click", function () {
      document.getElementById("sales-name").value = name;
      document.getElementById("sales-amount").value = amount;
      salesAndAmountValues.removeChild(salesDiv);
      totalSales -= amount;
      totalSalesValue.innerText = `Rs ${totalSales}`;
      updateBalance();
    });
  }

  // Add expenses to list
  function addExpenseToList(name, amount) {
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense-item");
    expenseDiv.innerHTML = `
      <div class="title1-head head">
        <div class="title1-value">- ${name}</div>
      </div>
      <div class="title2-head head">
        <div class="title2-value">Rs ${amount}</div>
      </div>
      <div class="icons-head head">
        <div class="icons list-item">
          <a href="#" class="edit-icon mx-2">
            <i class="fa fa-edit"></i>
          </a>
          <a href="#" class="delete-icon">
            <i class="fa fa-trash"></i>
          </a>
        </div>
      </div>
    `;
    expensesAndAmountValues.appendChild(expenseDiv);

    // Add event listeners for edit and delete icons
    expenseDiv
      .querySelector(".delete-icon")
      .addEventListener("click", function () {
        expensesAndAmountValues.removeChild(expenseDiv);
        totalExpenses -= amount;
        totalExpensesValue.innerText = `Rs ${totalExpenses}`;
        updateBalance();
      });

    expenseDiv
      .querySelector(".edit-icon")
      .addEventListener("click", function () {
        document.getElementById("expense-name").value = name;
        document.getElementById("expense-amount").value = amount;
        expensesAndAmountValues.removeChild(expenseDiv);
        totalExpenses -= amount;
        totalExpensesValue.innerText = `Rs ${totalExpenses}`;
        updateBalance();
      });
  }
});
