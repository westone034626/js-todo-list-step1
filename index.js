const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const todo_count_container = document.querySelector(".todo-count");
const todo_count = todo_count_container.querySelector("strong");

function updateToDoCount() {
  todo_count.innerHTML = todoList.children.length;
}

function handleEdit(event) {
  if (event.key === "Enter" && event.target.value !== "") {
    event.target.parentNode.querySelector("label").innerHTML =
      event.target.value;
    event.target.parentNode.classList.remove("editing");
  } else if (event.key === "Escape") {
    event.target.parentNode.querySelector("label").innerHTML =
      event.target.name;
    event.target.parentNode.classList.remove("editing");
  }
}

function handleDBClick(event) {
  if (event.target.tagName === "LABEL") {
    const original = event.target.innerHTML;
    event.target.parentNode.parentNode.classList.add("editing");
    const subInput = event.target.parentNode.parentNode.querySelector(".edit");
    subInput.value = original;
    subInput.name = original;
    subInput.addEventListener("keyup", handleEdit);
  }
}

function handleDelete(event) {
  if (event.target.tagName === "BUTTON") {
    const li = event.target.parentNode.parentNode;
    todoList.removeChild(li);
  }
  updateToDoCount();
}

function handleComplete(event) {
  if (event.target.tagName === "INPUT") {
    if (event.target.closest("input").checked) {
      console;
      event.target.parentNode.parentNode.classList.add("completed");
    } else {
      event.target.parentNode.parentNode.classList.remove("completed");
    }
  }
}

function createToDoItem(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  `;
  todoList.appendChild(li);
}

function handleSubmit(event) {
  if (event.key == "Enter" && input.value !== "") {
    const currentValue = input.value;
    createToDoItem(currentValue);
    input.value = "";
    updateToDoCount();
  }
}

function init() {
  input.addEventListener("keypress", handleSubmit);
  todoList.addEventListener("click", handleComplete);
  todoList.addEventListener("click", handleDelete);
  todoList.addEventListener("dblclick", handleDBClick);
}

init();
