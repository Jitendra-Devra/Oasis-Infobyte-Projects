let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            timestamp: new Date().toLocaleString()
        };

        pendingTasks.push(task);
        taskInput.value = "";
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    pendingTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.text}</strong> 
            <small>(${task.timestamp})</small>
            <div class="task-actions">
                <button class="complete" onclick="completeTask(${task.id})">Complete</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id}, false)">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('completed');
        li.innerHTML = `<strong>
            ${task.text}</strong>
            <small>(${task.timestamp})</small>
            <div class="task-actions">
                <button class="delete" onclick="deleteTask(${task.id}, true)">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(li);
    });
}

function completeTask(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        const task = pendingTasks[taskIndex];
        task.completed = true;
        task.timestamp = new Date().toLocaleString(); // Update timestamp on completion
        pendingTasks.splice(taskIndex, 1);
        completedTasks.push(task);
        renderTasks();
    }
}
function editTask(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        const newTaskText = prompt("Edit your task:", pendingTasks[taskIndex].text);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            pendingTasks[taskIndex].text = newTaskText.trim();
            renderTasks();
        }
    }
}

function deleteTask(taskId, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    } else {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}
