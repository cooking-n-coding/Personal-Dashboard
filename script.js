// 1. Our "Source of Truth" (The Array)
const urgentInput = document.getElementById('focus-input');
const saveBtn1 = document.getElementById('save-focus');
const urgentList = document.getElementById('urgent-list');
let urgentTasks = []; 

// The Button Listener to update data
saveBtn1.addEventListener('click', () => {
    const taskText = urgentInput.value.trim();

    if (taskText !== "") {
        // Instead of creating HTML, we create an OBJECT and push it to the array
        const newTaskObject = {
            text: taskText,
            completed: false
        };
        
        urgentTasks.push(newTaskObject); // Add to data
        urgentInput.value = "";          // Clear input
        renderTasks();                   // Tell the UI to update based on the new data
    } else {
        alert("Please enter a task!");
    }
});

// 3. The Render Function (The "Artist" that draws the UI)
function renderTasks() {
    urgentList.innerHTML = ""; // Clear the old view

    urgentTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // We use innerHTML here to easily add the buttons and checkbox
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        
        urgentList.appendChild(li);
    });
}

//3. select elements for unprior tasks
const unpriorInput = document.getElementById('unfocus-input');
const saveBtn2 = document.getElementById('save-unfocus');
const laterList = document.getElementById('later-list');
let laterTasks = [];
//4. add event listener to add unprior tasks.
saveBtn2.addEventListener('click', () => {
     const taskText = urgentInput.value.trim();

    if (taskText !== "") {
        // Instead of creating HTML, we create an OBJECT and push it to the array
        const newTaskObject = {
            text: taskText,
            completed: false
        };
        
        urgentTasks.push(newTaskObject); // Add to data
        urgentInput.value = "";          // Clear input
        renderTasks();                   // Tell the UI to update based on the new data
    } else {
        alert("Please enter a task!");
    }
});

function renderTasks() {
    laterList.innerHTML = ""; // Clear the old view

    laterTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // We use innerHTML here to easily add the buttons and checkbox
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        
        laterList.appendChild(li);
    });
}

//5. Timer functionality for count down
// TOP OF FILE: Global variables (The memory of our app)
let countdown; 

// Select UI elements
const timeInput = document.getElementById('time-set');
const timeSelect = document.getElementById('time-unit');
const startBtn = document.getElementById('start-timer');
const stopBtn = document.getElementById('stop-timer');
const resetBtn = document.getElementById('reset-timer');
// const timeInput = document.getElementById('time-set');

timeInput.addEventListener('input', (e) => {
    // 1. Remove anything that isn't a number
    let value = e.target.value.replace(/\D/g, ''); 
    
    // 2. Auto-format logic
    if (value.length > 2) {
        // If more than 2 digits, split them: [First 2]:[Remaining]
        e.target.value = value.slice(0, 2) + ":" + value.slice(2, 4);
    } else {
        e.target.value = value;
    }
});

// INITIAL STATE: Hide Stop and Reset until we start
stopBtn.style.display = 'none';
resetBtn.style.display = 'none';

// --- INTERACTIVE FEATURE 1: Dropdown Updates Input ---
timeSelect.addEventListener('change', () => {
    // When the user picks "15 min", we extract "15" and put it in the box
    const selectedMins = parseInt(timeSelect.value);
    timeInput.value = `${selectedMins}:00`;
});

// --- INTERACTIVE FEATURE 2: Button Toggling Function ---
function toggleTimerUI(isRunning) {
    if (isRunning) {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        resetBtn.style.display = 'inline-block';
    } else {
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        resetBtn.style.display = 'none';
    }
}

// --- TIMER LOGIC ---
startBtn.addEventListener('click', () => {
    let timeParts = timeInput.value.split(':'); // Splits "25:00" into ["25", "00"]
    let minutes = parseInt(timeParts[0]);
    let seconds = timeParts[1] ? parseInt(timeParts[1]) : 0;
    
    let totalSeconds = (minutes * 60) + seconds;

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Please set a time first!");
        return;
    }

    toggleTimerUI(true); // Show Stop/Reset
    clearInterval(countdown);

    countdown = setInterval(() => {
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(countdown);
            toggleTimerUI(false);
            alert("Time's up!");
            return;
        }

        let m = Math.floor(totalSeconds / 60);
        let s = totalSeconds % 60;
        timeInput.value = `${m}:${s.toString().padStart(2, '0')}`;
    }, 1000);
});

// Reset Button Logic
resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    timeInput.value = "";
    toggleTimerUI(false); // Go back to start state
});

// Stop Button Logic
stopBtn.addEventListener('click', () => {
    clearInterval(countdown);
    // Note: We don't hide the buttons here so they can click 'Start' again to resume
});