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

//5. Timer functionality
let countdown; // This variable will hold our "metronome" so we can stop it later

const startBtn = document.getElementById('start-timer');
const timerDisplay = document.getElementById('timer-display');
const timeInput = document.getElementById('time-set');

startBtn.addEventListener('click', function() {
    // 1. Get the minutes from the input and convert to total seconds
    let minutes = parseInt(timeInput.value);
    
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes!");
        return;
    }

    let totalSeconds = minutes * 60;

    // 2. Clear any existing timer (so they don't overlap if clicked twice!)
    clearInterval(countdown);

    // 3. Start the "Metronome" (Interval)
    countdown = setInterval(function() {
        totalSeconds--; // Subtract 1 second

        // 4. Calculate display minutes and seconds
        let displayMins = Math.floor(totalSeconds / 60);
        let displaySecs = totalSeconds % 60;

        // 5. Update the Screen (The DOM!)
        // We use "padStart" to make sure 9 seconds looks like "09"
        timerDisplay.textContent = `${displayMins}:${displaySecs.toString().padStart(2, '0')}`;

        // 6. Stop when we hit zero
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            alert("Time is up! Deep breath.");
        }
    }, 1000); // 1000 milliseconds = 1 second
});