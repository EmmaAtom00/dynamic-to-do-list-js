document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
      alert("Please enter a task");
      return;
    }
    let li = document.createElement('li');
    li.textContent = taskText;
    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add = "remove-btn";

    // Remove task when clicked
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append button → li → list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
  }

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
  });

  addTask();
});
