
// require('./js/JsonStorage.js');

// const JsonStorage = require('./js/JsonStorage') 


class JsonStorage {

    data;


    constructor( table ) {
        // const fs = require('fs');
        // const filePath = ("./data/" + table + ".json");

        // try {
        //     if (fs.existsSync( filePath )) {
        //         fetchJSONData( filePath );
        //     } else {
        //         fs.writeFile( filePath );
        //         fetchJSONData( filePath );
        //     }
        // } catch(err) { }
    }

    // fetchJSONData(table) {
    //     fetch( table )
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error
    //                     (`HTTP error! Status: ${res.status}`);
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             this.data = data;
    //         })
    //         .catch((error) => 
    //                 console.error("Unable to fetch data:", error));
    // }
    

   
}


// import { JsonStorage } from `./js/JsonStorage.js`;
const fs = require('./fs');
const todos = new JsonStorage( "wdwd" );

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}


