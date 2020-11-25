const toDoApp = document.querySelector(".todoapp");
const input = toDoApp.querySelector("input");
const todo_list = document.querySelector(".todo-list");

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
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", handleClick);
    span.innerHTML = text;
    li.appendChild(checkbox);
    li.appendChild(span);
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