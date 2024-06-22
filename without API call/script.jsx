document.addEventListener('DOMContentLoaded', () => {
	const taskForm = document.getElementById('taskForm');
	const taskList = document.getElementById('task-list');

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
	function displayTask(name, description, deadline) {
		const taskCard = document.createElement('div');
		taskCard.classList.add('task-card');

		taskCard.innerHTML = `
            <div>
                <h3>${name}</h3>
                <p>Description: ${description}</p>
                <p>Date limite: ${deadline}</p>
            </div>
            <button class="delete-button" onclick="deleteTask(this)">Supprimer</button>
        `;

		taskList.appendChild(taskCard);
	}

	// Function to add a new task
	function addTask(name, description, deadline) {
		displayTask(name, description, deadline);
	}
});

// Function to delete a task
function deleteTask(button) {
	const taskCard = button.parentElement;
	taskCard.remove();
}
