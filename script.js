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

const students = [];


//Function to Remove Data
function removeData(event) {
    let tr = document.querySelectorAll("tbody tr");
    let tbody = document.getElementsByTagName("tbody")[0];
    let columnId = event.target.parentElement.parentElement.parentElement.parentElement;
   

    // console.log(columnId.children[0].innerText);
    //Removing data from the student array
    students.forEach((val, index)=>{
        if(val.Id == columnId.children[0].innerText)
        {
            students.splice(index,index+1);
        }
    });
    //   console.log(students);

    Array.from(tr).forEach((val)=>{
        if(val.children[0] === columnId.children[0])
        {
            tbody.removeChild(val);
        }
    })
}



//Function to edit data
function editData(event) {
    let columnId =event.target.parentNode.parentNode.parentNode.parentNode;
    // console.log(columnId.children[0].innerText);
   console.log(columnId.children);
    let inputs = document.getElementsByTagName("input");
    
    let editButton = document.getElementsByClassName("edit-submit")[0];
    //Updating data in the array
  students.forEach((val) => {
    // console.log(val);
    if (val.Id == columnId.children[0].innerHTML) {
      inputs[0].value = val.name;
      inputs[1].value = val.email;
      inputs[2].value = val.gpa;
      inputs[3].value = val.age;
      inputs[4].value = val.degree;
    }
  });

  editButton.style.display = "block";
  editButton.addEventListener("click", (e) => {
  
    students.forEach((val) => {
      if (val.Id == columnId.children[0].innerText) {
        columnId.children[0].innerText = val.Id;
        val.name = inputs[0].value;
        columnId.children[1].innerText = val.name;
        val.email = inputs[1].value;
        columnId.children[2].innerText = val.email;
        val.gpa = inputs[2].value;
        columnId.children[4].innerText = val.gpa;
        val.age = inputs[3].value;
        columnId.children[3].innerText = val.age;
        val.degree = inputs[4].value;
        columnId.children[5].children[0].innerHTML = val.degree;
      }
    });

    // students.forEach((val)={
    //     if(val.Id == )
    // })

    Array.from(inputs).forEach((val)=>{
        val.value = "";
    })
    // e.target.removeEventListener("click", e);
    e.target.style.display = "none";
    // console.log(students);
  });
}

//Function to search Data
function searchData(e) {
  let value = e.target.value;
  // console.log(value.trim());
  let tr = document.querySelectorAll("tbody tr");
  Array.from(tr).forEach((val) => {
    let td = val.getElementsByTagName("td");
    // console.log(td[1].innerHTML.toLocaleUpperCase().trimStart());

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
  if (value === "") {
    Array.from(tr).forEach((val) => {
      val.style.display = "table-row";
    });
  }
}
//Creating Search Functionality
let search = document.getElementsByName("search")[0];
search.addEventListener("keyup", searchData);

//Function to add data into UI
function addDataInUI(obj) {
  let tbody = document.getElementsByTagName("tbody")[0];
  let tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${obj.Id}</td>
    <td>${obj.name}</td>
    <td>${obj.email}</td>
    <td>${obj.age}</td>
    <td>${obj.gpa}</td>
    <td>
      <p>${obj.degree}</p>
      <div class="edit-buttons">
        <button class="edit"><i class="fa-regular fa-pen-to-square" style="color: #f5f5f5;"></i></button><button class="delete"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
      </div>
    </td>`;
  tbody.appendChild(tr);
}

//Unique Id for Every Student
let Id = 1;
function extractData(e) {
  e.preventDefault();
  let element = e.target.children;
  // console.log(element);
  let obj = { Id: Id };
  Id++;
  Array.from(element).forEach((val) => {
    if (val.hasAttribute("name")) {
      obj[val.name] = val.value;
    }
  });
  // console.log(obj);
  students.push(obj);
  addDataInUI(obj);
//   console.log(students);
//Clearing Form inputs
  Array.from(element).forEach((val) => {
    val.value = "";
  });


// Adding Event Listener to edit and Delete buttons  
  let editBtn = document.getElementsByClassName("edit");
  let deleteBtn = document.getElementsByClassName("delete");
  Array.from(editBtn).forEach((val) => {
    val.addEventListener("click", editData);
  });

  Array.from(deleteBtn).forEach((val)=>{
    val.addEventListener("click", removeData);
  })
}

let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", extractData);
