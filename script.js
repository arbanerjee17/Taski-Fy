function showInput(sectionId) {
  const inputArea = document.getElementById(`${sectionId}-input`);
  inputArea.innerHTML = `
    <input type="text" id="${sectionId}-new-task" placeholder="Enter task" />
    <button onclick="addTask('${sectionId}')">Save Task</button>
  `;
}

function addTask(sectionId) {
  const input = document.getElementById(`${sectionId}-new-task`);
  const taskText = input.value.trim();
  if (taskText === '') return;

  const taskList = document.getElementById(`${sectionId}-list`);
  const task = document.createElement('div');
  task.className = 'task';
  task.innerHTML = `
    <span>${taskText}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;
  taskList.appendChild(task);

  document.getElementById(`${sectionId}-input`).innerHTML = '';

  // ✅ Save after adding
  saveTasks();
}

function deleteTask(btn) {
  btn.parentElement.remove();

  // ✅ Save after deleting
  saveTasks();
}

function saveTasks() {
  const taskData = {
    'progress-list': getTasks('progress-list'),
    'complete-list': getTasks('complete-list'),
    'pending-list': getTasks('pending-list'),
  };
  localStorage.setItem('tasks', JSON.stringify(taskData));
}

function getTasks(sectionId) {
  const section = document.getElementById(sectionId);
  const tasks = section.querySelectorAll('.task');
  return Array.from(tasks).map(task => task.querySelector('span').textContent);
}

function loadTasks() {
  const taskData = JSON.parse(localStorage.getItem('tasks'));
  if (!taskData) return;

  Object.keys(taskData).forEach(sectionId => {
    taskData[sectionId].forEach(taskText => {
      createTask(sectionId, taskText);
    });
  });
}

function createTask(sectionId, text) {
  const taskBox = document.createElement('div');
  taskBox.className = 'task';
  taskBox.innerHTML = `
    <span>${text}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;
  document.getElementById(sectionId).appendChild(taskBox);
}

// ✅ Load on refresh
window.onload = loadTasks;
