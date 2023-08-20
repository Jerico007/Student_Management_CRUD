{
  /*      <tr>
            <td>1</td>
            <td>Jack</td>
            <td>xyz@gmail.com</td>
            <td>12</td>
            <td>7.5</td>
            <td>
              <p>BCA</p>
              <div class="edit-buttons">
                <button id="edit" ><i class="fa-regular fa-pen-to-square" style="color: #f5f5f5;"></i></button ><button id="delete"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
              </div>
            </td>
        </tr>  */
}

//Unique Id for Every Student
let Id = 1;
//Students database
const students = [];
//Creating Search Functionality
let search = document.getElementsByName("search")[0];
search.addEventListener("keyup", searchData);

//Adding event Listener to form
let form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", extractData);

//Function to Remove Data
function removeData(event) {
  if (confirm("Data will get deleted!")) {
    let tr = document.querySelectorAll("tbody tr");
    let tbody = document.getElementsByTagName("tbody")[0];
    let columnId =
      event.target.parentElement.parentElement.parentElement.parentElement;

    // console.log(columnId.children[0].innerText);
    //Removing data from the student array
    students.forEach((val, index) => {
      if (val.Id == columnId.children[0].innerText) {
        students.splice(index, index + 1);
      }
    });

    //Trying to match the column Id of each and every row
    Array.from(tr).forEach((val) => {
      if (val.children[0] === columnId.children[0]) {
        tbody.removeChild(val);
      }
    });
  }
  return;
}

//Function to edit data
function editData(event) {
  let columnId = event.target.parentNode.parentNode.parentNode.parentNode;
  let inputs = document.getElementsByTagName("input");
  let editButton = document.getElementsByClassName("edit-submit")[0];
  //Showing data into the input
  students.forEach((val) => {
    if (val.Id == columnId.children[0].innerHTML) {
      inputs[0].value = val.name;
      inputs[1].value = val.email;
      inputs[2].value = val.gpa;
      inputs[3].value = val.age;
      inputs[4].value = val.degree;
    }
  });

  editButton.style.display = "block";
  editButton.addEventListener("click", function updateData(e) {
    //Updating students array with new values(Edited values)
    students.forEach((val) => {
      if (val.Id == columnId.children[0].innerText) {
        val.name = inputs[0].value;
        val.email = inputs[1].value;
        val.gpa = inputs[2].value;
        val.age = inputs[3].value;
        val.degree = inputs[4].value;
      }
    });
    //Adding new Data into table
    addDataInUI();
    //Clearing the form
    Array.from(inputs).forEach((val) => {
      val.value = "";
    });
    //Removing the event listener to avoid logical error
    e.target.removeEventListener("click", updateData);
    //Reseting the edit button
    e.target.style.display = "none";
  });
}

//Function to search Data
function searchData(e) {
  let value = e.target.value;
  // console.log(value.trim());
  let tr = document.querySelectorAll("tbody tr");
  Array.from(tr).forEach((val) => {
    let td = val.getElementsByTagName("td");
    //Checking if value matches with the data
    if (
      value.toUpperCase().trim() === td[1].innerText.toUpperCase().trim() ||
      value.toUpperCase().trim() === td[2].innerText.toUpperCase().trim() ||
      value.toUpperCase().trim() === td[5].innerText.toUpperCase().trim()
    ) {
      val.style.display = "table-row";
    } else {
      val.style.display = "none";
    }
  });
  //If search value is blank the show all data
  if (value === "") {
    Array.from(tr).forEach((val) => {
      val.style.display = "table-row";
    });
  }
}

//Function to add data into UI
function addDataInUI(obj) {
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  students.forEach((val) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${val.Id}</td>
      <td>${val.name}</td>
      <td>${val.email}</td>
      <td>${val.age}</td>
      <td>${val.gpa}</td>
      <td>
        <p>${val.degree}</p>
        <div class="edit-buttons">
          <button class="edit"><i class="fa-regular fa-pen-to-square" style="color: #f5f5f5;"></i></button><button class="delete"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
  // Adding click Event Listener to edit and Delete buttons
  let editBtn = document.getElementsByClassName("edit");
  let deleteBtn = document.getElementsByClassName("delete");
  Array.from(editBtn).forEach((val) => {
    val.addEventListener("click", editData);
  });

  Array.from(deleteBtn).forEach((val) => {
    val.addEventListener("click", removeData);
  });
}

//Extracting form Data
function extractData(e) {
  e.preventDefault();
  let element = e.target.children;
  let obj = { Id: Id };
  Id++;
  Array.from(element).forEach((val) => {
    if (val.hasAttribute("name")) {
      obj[val.name] = val.value;
    }
  });
  //Pushing a new student into the student array
  students.push(obj);
  //Adding data into the UI
  addDataInUI();
  //Clearing Form inputs
  Array.from(element).forEach((val) => {
    val.value = "";
  });
}
