// selecting the elements for urgent tasks
const focusedInput = document.getElementById('focus-input');
const focusedBtn = document.getElementById('save-focus');
const focusedList = document.getElementById('urgent-list');
let focusedTasks = []; 

// selecting elements for later tasks
const unfocusedInput = document.getElementById('unfocus-input');
const unfocusedBtn = document.getElementById('save-unfocus');
const unfocusedList = document.getElementById('later-list');
let unfocusedTasks = [];

// reuseable function to add tasks
const addTask = (inputTask, taskArray, renderFn) => {
  const textTask = inputTask.value.trim();
  if (!textTask) {
    alert("Please enter a task");
    return;
  }

  taskArray.push({
    text : textTask,
    completed: false,
    isEditing: false
  });

  inputTask.value = "";
  renderFn();
}

// eventlisteners for both task lists
focusedBtn.addEventListener('click', () =>
  addTask(focusedInput, focusedTasks, renderFocusedTasks)
);

unfocusedBtn.addEventListener('click', () =>
  addTask(unfocusedInput, unfocusedTasks, renderUnfocusedTasks)
);

// renderfubctions for both task lists
function renderTasks(taskArray, taskList, allowComplete = false) {
  taskList.innerHTML = "";

  taskArray.forEach((task, index) => {
    const li = document.createElement('li');

    // LEFT
    const left = document.createElement('div');
    left.className = 'task-left';

    if (allowComplete) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.onchange = () => {
        task.completed = !task.completed;
        renderTasks(taskArray, taskList, allowComplete);
      };
      left.appendChild(checkbox);
    }

    // CENTER
    const center = document.createElement('div');
    center.className = 'task-center';

    if (task.isEditing) {
      const input = document.createElement('input');
      input.value = task.text;
      input.className = 'edit-input';
      center.appendChild(input);
    } else {
      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = 'task-text';
      if (task.completed) span.classList.add('completed');
      center.appendChild(span);
    }

    // RIGHT
    const right = document.createElement('div');
    right.className = 'task-right';

    const editBtn = document.createElement('button');
    editBtn.textContent = task.isEditing ? 'Save' : 'Edit';
    editBtn.onclick = () => {
      if (task.isEditing) {
        const input = center.querySelector('input');
        task.text = input.value.trim();
        task.isEditing = false;
      } else {
        task.isEditing = true;
      }
      renderTasks(taskArray, taskList, allowComplete);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      taskArray.splice(index, 1);
      renderTasks(taskArray, taskList, allowComplete);
    };

    right.append(editBtn, deleteBtn);

    li.append(left, center, right);
    taskList.appendChild(li);
  });
}


// specific render functions
function renderFocusedTasks() {
  renderTasks(focusedTasks, focusedList, true);
}

function renderUnfocusedTasks() {
  renderTasks(unfocusedTasks, unfocusedList, true);
}


console.log("focusedList", focusedList);
console.log("focusedTasks", focusedTasks);


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

