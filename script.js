//getting the id of form after being submit

function expensesFunction() {
  document
    .getElementById("expense-form")
    .addEventListener("submit", function (event) {
      //preventing the submit error
      event.preventDefault();

      //getting the value of all input field
      let category = document.getElementById("category").value;
      let amount = document.getElementById("amount").value;
      let date = document.getElementById("date").value;

      //getting the table body
      let tbody = document.querySelector(".table-body");

      //creating all the elements for the table
      let tr = document.createElement("tr");
      let tdCategory = document.createElement("td");
      tdCategory.textContent = category;
      let tdAmount = document.createElement("td");
      tdAmount.className = "amount-expenses";
      tdAmount.textContent = amount;
      let tdDate = document.createElement("td");
      tdDate.textContent = date;
      let tdDelete = document.createElement("td");
      //creating a delete button and add click event function for deleting the parent rows
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", function () {
        let row = this.parentElement.parentElement;

        if (tbody.contains(row)) {
          tbody.removeChild(row);

          updateTotalAmount();
        }
      });

      //appending now the element
      tdDelete.appendChild(deleteButton);

      tr.appendChild(tdCategory);
      tr.appendChild(tdAmount);
      tr.appendChild(tdDate);
      tr.appendChild(tdDelete);

      //condition in input field
      if (category == "" || amount == "" || date == "") {
        alert("please complete all fields");
      } else {
        tbody.insertBefore(tr, tbody.firstChild);
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";

        updateTotalAmount();
        saveData();
      }
    });
}

//function for saving the innerHTML
function saveData() {
  let tableHtml = document.querySelector(".table-body").innerHTML;
  localStorage.setItem("tableData", tableHtml);
}

// Function to show data from local storage
function showData() {
  let savedData = localStorage.getItem("tableData");
  if (savedData) {
    document.querySelector(".table-body").innerHTML = savedData;
    // Reattach event listeners to dynamically added elements
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        let row = this.parentElement.parentElement;
        if (document.querySelector(".table-body").contains(row)) {
          document.querySelector(".table-body").removeChild(row);
          updateTotalAmount();
          saveData();
        }
      });
    });
    updateTotalAmount();
  }
}

//a function for updating the total value
function updateTotalAmount() {
  let tdAmountElements = document.querySelectorAll(".amount-expenses");
  let totalAmount = 0;

  tdAmountElements.forEach((element) => {
    totalAmount += parseFloat(element.textContent) || 0;
  });

  document.getElementById("total").textContent = totalAmount;

  saveData();
}

//calling the function and calling the show data to get the innerhtml and back again all eventlistener inside of showdata() function
expensesFunction();
showData();
