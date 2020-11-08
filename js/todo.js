console.log("Todo APP");

showTodos();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", addTodo);

function addTodo(e) {
    e.preventDefault();
    let myInput = document.getElementById("myInput");
    let todos = localStorage.getItem("todos");
    if (todos === null) {
        todosObj = [];
    }
    else {
        todosObj = JSON.parse(todos);
    }
    if (myInput.value != "") {
        todosObj.push(myInput.value);
        localStorage.setItem("todos", JSON.stringify(todosObj));
        myInput.value = "";
    }
    else {
        alert("It seems you didn't write anything?");
    }
    showTodos();
}

function showTodos() {
    let todos = localStorage.getItem("todos");
    if (todos === null) {
        todosObj = []
    }
    else {
        todosObj = JSON.parse(todos);
    }
    let html = "";
    todosObj.forEach((element, index) => {
        html += ` <li id="li" class="unchecked">${element}<span id="${index}" onclick="deleteTodo(this.id)" class="close">&times;</span></li> `;
    });

    let todoElement = document.getElementById('myUL');
    if (todosObj.length != 0) {
        todoElement.innerHTML = html;
        todoElement.style.textAlign = "left";
    } else {
        todoElement.innerHTML = `ToDo List Is Empty!`;
        todoElement.style.textAlign = "center";
    }
}

function deleteTodo(index) {
    let todos = localStorage.getItem("todos");
    if (todos === null) {
        todosObj = []
    }
    else {
        todosObj = JSON.parse(todos);
        todosObj.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todosObj));
    }
    showTodos();
}
//Checked Todo
let todoList = document.getElementById('myUL');
todoList.addEventListener("click", (e) => {
    if (e.target.className === "unchecked") {
        e.target.className = "checked";
    } else {
        e.target.className = "unchecked";
    }
});

//filters
function selectOption() {
    let list = document.getElementById("list");
    if (list.value === 'All') {
        let li = document.getElementsByTagName("li");
        Array.from(li).forEach((element) => {
            element.style.display = "list-item";
        });
    }
    else if (list.value === 'Completed') {
        let li = document.getElementsByTagName("li");
        Array.from(li).forEach((element) => {
            if (element.className !== 'checked') {
                element.style.display = "none";
            }
            else {
                element.style.display = "list-item";
            }
        });
    }
    else if (list.value === 'Uncompleted') {
        let li = document.getElementsByTagName("li");
        Array.from(li).forEach((element) => {
            if (element.className !== 'unchecked') {
                element.style.display = "none";
            }
            else {
                element.style.display = "list-item";
            }
        });
    }
}
