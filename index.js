const toDoApp = document.querySelector(".todoapp");
const input = toDoApp.querySelector("input");
const todo_list = document.querySelector(".todo-list");

function createToDoItem(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = text;
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