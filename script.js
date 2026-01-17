// 1. Select the elements
const urgentInput = document.getElementById('focus-input');
const saveBtn = document.getElementById('save-focus');
const urgentList = document.getElementById('urgent-list');

// 2. Add the "EventListener"
saveBtn.addEventListener('click', function() {
    // Get the value from the input box
    const taskText = urgentInput.value;

    // Check if the user actually typed something
    if (taskText !== "") {
        // Create a new list item (li)
        const newTask = document.createElement('li');
        
        // Set the text of that li to our taskText
        newTask.textContent = taskText;

        // Add the li to our list
        urgentList.appendChild(newTask);

        // Clear the input box for the next task
        urgentInput.value = "";
    } else {
        alert("Please enter a task!");
    }
});