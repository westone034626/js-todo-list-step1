const toDoApp = document.querySelector(".todoapp");
const input = toDoApp.querySelector("input");
const todo_list = document.querySelector(".todo-list");
const todo_count_container = document.querySelector(".todo-count");
const todo_count = todo_count_container.querySelector("strong");

function updateToDoCount() {
    todo_count.innerHTML = todo_list.children.length;
}

function handleEdit(event) {
    const li = event.target.parentNode;
    const currentValue = event.target.value;
    if (event.key === 'Enter' && currentValue !== "") {
        const span = document.createElement("span");
        span.addEventListener("dblclick", handleDBClick);
        span.innerHTML = currentValue;
        li.replaceChild(span, event.target);
    }
    else if (event.key === 'Escape') {
        const span = document.createElement("span");
        span.addEventListener("dblclick", handleDBClick);
        span.innerHTML = event.target.name;
        li.replaceChild(span, event.target);
    }
}

function handleDBClick(event) {
    const span = event.target;
    const li = span.parentNode;
    const input = document.createElement("input");
    input.value = span.innerHTML;
    input.name = span.innerHTML;
    input.addEventListener("keydown",handleEdit);
    li.replaceChild(input, span);
}

function handleDelete(event) {
    const li = event.target.parentNode;
    todo_list.removeChild(li);
    updateToDoCount();
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
    span.addEventListener("dblclick", handleDBClick);
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
        updateToDoCount();
    }
}

function init() {
    input.addEventListener("keypress", handleSubmit);
}

init();