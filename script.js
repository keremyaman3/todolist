const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Görevleri localStorage'dan yükle
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.textContent = task.text;

    // Tamamlandı işaretleme
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Silme butonu
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Sil';
    delBtn.className = 'deleteBtn';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// Başlangıçta görevleri göster
renderTasks();
