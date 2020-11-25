const toDoApp = document.querySelector(".todoapp");
const input = toDoApp.querySelector("input");
const todo_list = document.querySelector(".todo-list");

function handleDelete(event) {
    const li = event.target.parentNode;
    todo_list.removeChild(li);
}

function handleClick(event) {
    const checkbox = event.target;
    const li = checkbox.parentNode;
    li.classList.toggle("completed");
    checkbox.classList.toggle("checked");
}

function createToDoItem(text) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", handleClick);
    span.innerHTML = text;
    delBtn.innerHTML = "❎";
    delBtn.addEventListener("click", handleDelete);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);li.appendChild(delBtn);
    li.classList.add("todo-item");
    todo_list.appendChild(li);
}

function handleSubmit(event) {
    if (event.key == 'Enter' && input.value !== "") {
        const currentValue = input.value;
        createToDoItem(currentValue);
        input.value = "";
    }
}

function init() {
    input.addEventListener("keypress", handleSubmit);
}

init();