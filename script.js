document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // false = don't save again
  }

  // Add a new task
  function addTask(taskText = null, save = true) {
    // If taskText not provided (from input field), get it
    if (taskText === null) {
      taskText = taskInput.value.trim();
      if (!taskText) {
        alert("Please enter a task");
        return;
      }
    }

    // Create <li>
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Remove task when clicked
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      if (save) {
        removeFromStorage(taskText);
      }
    };

    // Append button → li → list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input if added from input field
    if (taskText === taskInput.value.trim()) {
      taskInput.value = "";
    }

    // Save to Local Storage
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // Remove task from Local Storage
  function removeFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Event listeners
  addButton.addEventListener("click", () => addTask());
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Load saved tasks on page load
  loadTasks();
});
