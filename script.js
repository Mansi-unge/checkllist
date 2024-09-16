let todoItems = []; // Array to store all the todo items
let isEditing = false; // Flag to check if an item is being edited
let editingItem = null; // The current item being edited

document.addEventListener("DOMContentLoaded", function () {
    // Select various elements from the DOM
    const addBtn = document.getElementById("add-btn");
    const todoNameInput = document.getElementById("todo-name");
    const dueDateInput = document.getElementById("due-date");
    const todoItemsContainer = document.querySelector(".todo-items");
    const taskDoneMsg = document.getElementById("task-done-msg");

    // Set initial welcome message
    taskDoneMsg.textContent = "Welcome! Start adding tasks to simplify your day.";

    // Add button click event listener to add a new todo
    addBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form submission
        const todoName = todoNameInput.value.trim(); // Get the todo name
        const dueDate = dueDateInput.value.trim(); // Get the due date

        // Check if either the name or the due date is missing
        if (todoName === "" || dueDate === "") {
            alert("Please provide both Name and DueDate for the task.");
            return;
        }

        // Create a new todo item object
        const newTodoItem = {
            id: Math.random().toString(36).substr(2, 9), // Generate a random ID
            name: todoName, // Todo task name
            duedate: dueDate, // Task due date
            completed: false, // Flag indicating whether the task is completed
            isBeingEdited: false // Flag to check if the task is being edited
        };

        // Add the new task to the todoItems array
        todoItems.push(newTodoItem);

        // Render the updated list of tasks
        renderTodoItems();

        // Clear the input fields after adding the task
        todoNameInput.value = "";
        dueDateInput.value = "";
    });

    // Function to render all todo items on the page
    function renderTodoItems() {
        // Clear the existing items
        todoItemsContainer.innerHTML = "";

        // Loop through each item in the todoItems array
        todoItems.forEach((item) => {
            const completedClass = item.completed ? "completed-task" : ""; // Add 'completed-task' class if the task is completed

            // If the task is being edited, show edit fields
            if (item.isBeingEdited) {
                const todoItemHTML = `
                    <div class="todo-item d-flex align-items-center justify-content-evenly">
                        <input type="text" class="data form-control " value="${item.name}" id="edit-name-${item.id}">
                        <input type="date" class="datae form-control " value="${item.duedate}" id="edit-date-${item.id}">
                        <button class="btn btn-primary " onclick="handleSaveEdit('${item.id}')">
                            <i class="fa-solid fa-check-double"></i>
                        </button>
                        <button class="btn btn-secondary ms-1" onclick="handleCancelEdit('${item.id}')">
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                `;
                todoItemsContainer.innerHTML += todoItemHTML; // Add the edit form to the container
            } else {
                // Display the task as a regular item
                const todoItemHTML = `
                    <div class="todo-item d-flex align-items-center justify-content-evenly  ${completedClass}">
                        <div class="data1 fw-bold px-2">${item.name}</div>
                        <div class="data2 fw-bold  px-2">${item.duedate}</div>
                        <button class="btns btn btn-warning " onclick="handleEditClick('${item.id}')">
                            <i class="fa-solid text-white fa-edit"></i>
                        </button>
                        <button class="btns btn btn-success ms-1" onclick="handleCompleteClick('${item.id}')">
                            ${item.completed ? "<i class='fa-solid fa-rotate-left'></i>" : "<i class='fa-solid fa-check'></i>"}
                        </button>
                        <button class="btns btn btn-danger ms-1" onclick="handleDeleteClick('${item.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <hr>
                `;
                todoItemsContainer.innerHTML += todoItemHTML; // Add the task to the container
            }
        });

        // Display a message based on the number of tasks
        if (todoItems.length === 0) {
            taskDoneMsg.textContent = "Welcome! Start adding tasks to simplify your day.";
        } else {
            taskDoneMsg.textContent = "Keep track of your tasks to simplify your day!";
        }
    }

    // Function to handle edit button click
    window.handleEditClick = function (itemId) {
        const item = todoItems.find((item) => item.id === itemId); // Find the task to be edited
        if (item) {
            item.isBeingEdited = true; // Set the task to edit mode
            renderTodoItems(); // Re-render the tasks to show the edit form
        }
    };

    // Function to toggle task completion
    window.handleCompleteClick = function (itemId) {
        const item = todoItems.find((item) => item.id === itemId); // Find the task to be completed or uncompleted
        if (item) {
            item.completed = !item.completed; // Toggle the completed flag
            renderTodoItems(); // Re-render the tasks
        }
    };

    // Function to delete a task
    window.handleDeleteClick = function (itemId) {
        todoItems = todoItems.filter((item) => item.id !== itemId); // Remove the task from the array
        renderTodoItems(); // Re-render the tasks
    };

    // Function to save changes after editing a task
    window.handleSaveEdit = function (itemId) {
        const item = todoItems.find((item) => item.id === itemId); // Find the task being edited
        const newName = document.getElementById(`edit-name-${itemId}`).value.trim(); // Get the new task name
        const newDate = document.getElementById(`edit-date-${itemId}`).value.trim(); // Get the new due date

        // Check if the new name or date is missing
        if (newName === "" || newDate === "") {
            alert("Please provide both Name and DueDate for the task.");
            return;
        }

        if (item) {
            item.name = newName; // Update the task name
            item.duedate = newDate; // Update the due date
            item.isBeingEdited = false; // Exit edit mode
            renderTodoItems(); // Re-render the tasks
        }
    };

    // Function to cancel editing a task
    window.handleCancelEdit = function (itemId) {
        const item = todoItems.find((item) => item.id === itemId); // Find the task being edited
        if (item) {
            item.isBeingEdited = false; // Exit edit mode without saving
            renderTodoItems(); // Re-render the tasks
        }
    };
});
