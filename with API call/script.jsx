document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('task-list');

    // Fetch and display existing tasks using the fetch API
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(tasks => {
            tasks.slice(0, 10).forEach(task => { // Limit to first 10 tasks
                displayTask(task.title, task.completed ? 'Completed' : 'Not completed', task.id);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));

    // Handle form submission to add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDeadline = document.getElementById('taskDeadline').value;

        addTask(taskName, taskDescription, taskDeadline);
        taskForm.reset();
    });

    // Function to display a task in the task list
    function displayTask(name, description, id, isNew = false) {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        if (isNew) {
            taskCard.classList.add('new-task');
            setTimeout(() => taskCard.classList.remove('new-task'), 2000); // Remove highlight after 2 seconds
        }
        taskCard.dataset.taskId = id; // Store the task ID

        taskCard.innerHTML = `
            <div>
                <h3>${name}</h3>
                <p>${description}</p>
            </div>
            <button onclick="deleteTask(this)">Supprimer</button>
        `;

        taskList.appendChild(taskCard);
    }

    // Function to add a new task via the API
    function addTask(name, description, deadline) {
        const newTask = {
            title: name,
            description: description,
            dueDate: deadline,
            userId: 1, // Assuming userId 1 for this example
            completed: false
        };

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(task => {
            displayTask(task.title, `Description: ${description}, Date limite: ${deadline}`, task.id, true);
        })
        .catch(error => console.error('Error adding task:', error));
    }
});

// Function to delete a task via the API
function deleteTask(button) {
    const taskCard = button.parentElement;
    const taskId = taskCard.dataset.taskId;

    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            taskCard.remove();
        } else {
            console.error('Error deleting task');
        }
    })
    .catch(error => console.error('Error:', error));
}

