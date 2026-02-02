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

    // ---- Checkbox (optional) ----
    if (allowComplete) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = !task.completed;
        renderTasks(taskArray, taskList, allowComplete);
      });
      li.appendChild(checkbox);
    }

    // ---- Text or Input (EDIT MODE) ----
    if (task.isEditing) {
      const editInput = document.createElement('input');
      editInput.value = task.text;

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.addEventListener('click', () => {
        task.text = editInput.value.trim();
        task.isEditing = false;
        renderTasks(taskArray, taskList, allowComplete);
      });

      li.append(editInput, saveBtn);
    } else {
      const span = document.createElement('span');
      span.textContent = task.text;

      if (task.completed) {
        span.classList.add('completed');
      }

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        task.isEditing = true;
        renderTasks(taskArray, taskList, allowComplete);
      });

      li.append(span, editBtn);
    }

    // ---- Delete ----
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskArray.splice(index, 1);
      renderTasks(taskArray, taskList, allowComplete);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// specific render functions
function renderFocusedTasks() {
  renderTasks(focusedTasks, focusedList, true);
}

function renderUnfocusedTasks() {
  renderTasks(unfocusedTasks, unfocusedList, false);
}



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

