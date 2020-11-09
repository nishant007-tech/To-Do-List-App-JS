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
    addClass();
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
        let classElement = localStorage.getItem("classElements");
        if (classElement === null) {
            classElementObj = [];
        } else {
            classElementObj = JSON.parse(classElement);
        }
        html += ` <li id=${index}  class=${classElementObj[index]}>${element}<span onclick="deleteTodo(this.id)" class="close">&times;</span></li> `;
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
    let classElement = localStorage.getItem("classElements");
    if (todos === null || classElement === null) {
        todosObj = [];
        classElementObj = [];
    }
    else {
        todosObj = JSON.parse(todos);
        classElementObj = JSON.parse(classElement);
        classElementObj.splice(index, 1);
        todosObj.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todosObj));
        localStorage.setItem("classElements", JSON.stringify(classElementObj));
    }
    showTodos();
}
//Checked Todo
let todoList = document.getElementById('myUL');
todoList.addEventListener("click", (element) => {
    if (element.target.className === 'unchecked') {
        element.target.className = "checked";
        let classElement = localStorage.getItem("classElements");
        if (classElement === null) {
            classElementObj = [];
        } else {
            classElementObj = JSON.parse(classElement);
        }
        classElementObj[element.target.id] = "checked";
        localStorage.setItem("classElements", JSON.stringify(classElementObj));

    } else {
        element.target.className = 'unchecked';
        let classElement = localStorage.getItem("classElements");
        if (classElement === null) {
            classElementObj = [];
        } else {
            classElementObj = JSON.parse(classElement);
        }
        classElementObj[element.target.id] = "unchecked";
        localStorage.setItem("classElements", JSON.stringify(classElementObj));
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

function addClass() {
    let classElement = localStorage.getItem("classElements");
    if (classElement === null) {
        classElementObj = [];
    } else {
        classElementObj = JSON.parse(classElement);
    }
    classElementObj.push("unchecked");
    localStorage.setItem("classElements", JSON.stringify(classElementObj));
}