// 1. Select the elements for urgent tasks
const urgentInput = document.getElementById('focus-input');
const saveBtn1 = document.getElementById('save-focus');
const urgentList = document.getElementById('urgent-list');

// 2. Add the "EventListener" to save focused tasks
saveBtn1.addEventListener('click', () => {
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

//3. select elements for unprior tasks
const unpriorInput = document.getElementById('unfocus-input');
const saveBtn2 = document.getElementById('save-unfocus');
const laterList = document.getElementById('later-list');
//4. add event listener to add unprior tasks.
saveBtn2.addEventListener('click', () => {
    const taskText = unpriorInput.value;
    if (taskText !== "") {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
        laterList.appendChild(newTask);
        unpriorInput.value = "";
    } else {
        alert("Please enter a task!");
    }
});

//5. Timer functionality for count down
const timeInput = document.getElementById('time-set');
const timeSelect = document.getElementById('time-unit'); // Grab the select box
const startBtn = document.getElementById('start-timer');

startBtn.addEventListener('click', function() {
    // 1. Logic: Check if user used the dropdown OR typed a number
    // We use parseInt on the select value because it says "15 minutes"
    let minutes = parseInt(timeInput.value) || parseInt(timeSelect.value);
    
    let totalSeconds = minutes * 60;

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Please select or enter a duration!");
        return;
    }

    clearInterval(countdown);

    countdown = setInterval(function() {
        totalSeconds = Math.max(0, totalSeconds - 1);

        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;
        
        // Now this works because the input is type="text"
        timeInput.value = `${mins}:${secs.toString().padStart(2, '0')}`;

        if (totalSeconds === 0) {
            clearInterval(countdown);
            alert("Time's up!");
        }
    }, 1000);
});
// Grab the new buttons from the DOM
const stopBtn = document.getElementById('stop-timer');
const resetBtn = document.getElementById('reset-timer');

// 1. The Stop Logic
stopBtn.addEventListener('click', function() {
    // We just stop the heartbeat. 
    // The current time stays visible in the input box.
    clearInterval(countdown);
});

// 2. The Reset Logic
resetBtn.addEventListener('click', function() {
    // First, stop any ticking heartbeat
    clearInterval(countdown);
    
    // Second, clear the input box and the dropdown
    timeInput.value = "";
    timeSelect.selectedIndex = 0; // Sets dropdown back to the first option
    
    // Third, a nice touch: focus the input so the user can type a new time immediately
    timeInput.focus();
});