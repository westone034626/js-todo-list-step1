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
  const isLabel = event.target.closest(".label");
  if (isLabel) {
    const original = isLabel.innerHTML;
    const li = isLabel.parentNode.parentNode;
    li.classList.add("editing");
    const subInput = li.querySelector(".edit");
    subInput.value = original;
    subInput.tempValue = original;
    subInput.addEventListener("keyup", handleEdit);
  }
}

function handleDelete(event) {
  const isDelBtn = event.target.closest(".destroy");
  if (isDelBtn) {
    const li = isDelBtn.parentNode.parentNode;
    todoList.removeChild(li);
  }
}

function handleComplete(event) {
  const isCheckBox = event.target.closest(".toggle");
  if (isCheckBox && isCheckBox.checked) {
    event.target.closest("li").classList.add("completed");
  } else {
    event.target.closest("li").classList.remove("completed");
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
  const targetValue = event.target.value;
  if (event.key == "Enter" && targetValue !== "") {
    createToDoItem(targetValue);
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
