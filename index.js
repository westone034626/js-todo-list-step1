const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const todo_count_container = document.querySelector(".todo-count");
const todo_count = todo_count_container.querySelector("strong");
const filters = document.querySelector(".filters");

let allTodos = [];

function makeEmpty() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}

function updateToDoCount() {
  todo_count.innerHTML = todoList.children.length;
}

function handleEdit(event) {
  const li = event.target.parentNode;
  if (event.key === "Enter" && event.target.value !== "") {
    li.querySelector("label").innerHTML = event.target.value;
    li.classList.remove("editing");
    allTodos.forEach(function (todo) {
      if (parseInt(li.id) === todo.id) {
        todo.text = li.querySelector("label").innerHTML;
      }
    });
  } else if (event.key === "Escape") {
    li.querySelector("label").innerHTML = event.target.tempValue;
    li.classList.remove("editing");
    allTodos.forEach(function (todo) {
      if (parseInt(li.id) === todo.id) {
        todo.text = li.querySelector("label").innerHTML;
      }
    });
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
    const newAllTodos = allTodos.filter(function (todo) {
      return parseInt(li.id) !== todo.id;
    });
    allTodos = newAllTodos;
    updateToDoCount();
  }
}

function handleComplete(event) {
  const isCheckBox = event.target.closest(".toggle");
  if (isCheckBox && isCheckBox.checked) {
    event.target.closest("li").classList.add("completed");
    for (let i of allTodos) {
      if (i.id === parseInt(event.target.closest("li").id)) {
        i.isActive = false;
      }
    }
  } else if (isCheckBox && isCheckBox.checked === false) {
    event.target.closest("li").classList.remove("completed");
    for (let i of allTodos) {
      if (i.id === parseInt(event.target.closest("li").id)) {
        i.isActive = true;
      }
    }
  }
}

function createToDoItem(todo) {
  const li = document.createElement("li");
  li.id = todo.id;
  if (todo.isActive === false) {
    li.classList.add("completed");
    isChecked = "checked";
  } else {
    isChecked = "";
  }
  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" ${isChecked}/>
      <label class="label">${todo.text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  `;
  todoList.appendChild(li);
  const todoObj = { id: todo.id, text: todo.text, isActive: todo.isActive };
  return todoObj;
}

function handleSubmit(event) {
  const todoObj = {
    text: event.target.value,
    id: allTodos.length + 1,
    isActive: true,
  };
  if (event.key == "Enter" && event.target.value !== "") {
    allTodos.push(createToDoItem(todoObj));
    input.value = "";
    updateToDoCount();
  }
}

function handleFilter(event) {
  const lis = filters.querySelectorAll("a");
  const isAll = event.target.closest(".all");
  const isActive = event.target.closest(".active");
  const isCompleted = event.target.closest(".completed");
  let currentTodos = [];

  if (isAll) {
    isAll.classList.add("selected");
    lis[1].classList.remove("selected");
    lis[2].classList.remove("selected");
    currentTodos = allTodos;
  } else if (isActive) {
    isActive.classList.add("selected");
    lis[0].classList.remove("selected");
    lis[2].classList.remove("selected");
    currentTodos = allTodos.filter(function (todo) {
      return todo.isActive;
    });
  } else if (isCompleted) {
    isCompleted.classList.add("selected");
    lis[0].classList.remove("selected");
    lis[1].classList.remove("selected");
    currentTodos = allTodos.filter(function (todo) {
      return todo.isActive === false;
    });
  }

  makeEmpty();
  currentTodos.forEach(function (todo) {
    createToDoItem(todo);
  });
}

function init() {
  input.addEventListener("keypress", handleSubmit);
  todoList.addEventListener("click", handleComplete);
  todoList.addEventListener("click", handleDelete);
  todoList.addEventListener("dblclick", handleDBClick);
  filters.addEventListener("click", handleFilter);
}

init();
