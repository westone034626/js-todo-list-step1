const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const todo_count_container = document.querySelector(".todo-count");
const todo_count = todo_count_container.querySelector("strong");

function updateToDoCount() {
  todo_count.innerHTML = todoList.children.length;
}

function handleEdit(event) {
  const li = event.target.parentNode;
  if (event.key === "Enter" && event.target.value !== "") {
    li.querySelector("label").innerHTML = event.target.value;
    li.classList.remove("editing");
  } else if (event.key === "Escape") {
    li.querySelector("label").innerHTML = event.target.tempValue;
    li.classList.remove("editing");
  }
}

function handleDBClick(event) {
  if (event.target.tagName === "LABEL") {
    const original = event.target.innerHTML;
    const li = event.target.parentNode.parentNode;
    li.classList.add("editing");
    const subInput = li.querySelector(".edit");
    subInput.value = original;
    subInput.tempValue = original;
    subInput.addEventListener("keyup", handleEdit);
  }
}

function handleDelete(event) {
  if (event.target.tagName === "BUTTON") {
    const li = event.target.parentNode.parentNode;
    todoList.removeChild(li);
    updateToDoCount();
  }
}

function handleComplete(event) {
  if (event.target.closest(".toggle").checked) {
    event.target.closest("li").classList.toggle("completed");
  } else {
    event.target.closest("li").classList.toggle("completed");
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
