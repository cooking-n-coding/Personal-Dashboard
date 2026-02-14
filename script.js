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
focusedBtn.addEventListener('click',() =>
  addTask(focusedInput, focusedTasks, renderFocusedTasks)
);
focusedInput.addEventListener('keydown',(e) => {
  if (e.key === 'Enter') {
    addTask(focusedInput, focusedTasks, renderFocusedTasks);
  }
});

unfocusedBtn.addEventListener('click', () =>
  addTask(unfocusedInput, unfocusedTasks, renderUnfocusedTasks)
);

unfocusedInput.addEventListener('keydown',(e) => {
  if (e.key === 'Enter') {
    addTask(unfocusedInput, unfocusedTasks, renderUnfocusedTasks);
  }
});

// renderfubctions for both task lists
function renderTasks(taskArray, taskList, allowComplete = false) {
  taskList.innerHTML = "";

  taskArray.forEach((task, index) => {
    const li = document.createElement('li');     
    li.className = 'task-item'; 
    li.setAttribute('tabindex', '0');
    
    // LEFT     
    const left = document.createElement('div');     
    left.className = 'checkbox';     
    if (allowComplete) {       
      const checkbox = document.createElement('input');       
      checkbox.type = 'checkbox';       
      checkbox.checked = task.completed;       
      checkbox.addEventListener('change', () => {         
        task.completed = !task.completed;         
        renderTasks(taskArray, taskList, allowComplete);       
      });       
      left.appendChild(checkbox);     
    }     
    // CENTER     
    const center = document.createElement('div');     
    center.className = 'task-list'; 

    if (task.isEditing) {       
      const input = document.createElement('input');       
      input.value = task.text;  
      // input.id = `edit-${index}`;     
      input.className = 'edit-input';       
      center.appendChild(input);     
    } else {       
      const span = document.createElement('span');       
      span.textContent = task.text;       
      span.className = 'task-text';       

      if (task.completed) span.classList.add('completed'); 
      
      span.addEventListener('click', () => {         
        task.completed = !task.completed;         
        renderTasks(taskArray, taskList, allowComplete);       
      });
      center.appendChild(span);     
    }     
      // RIGHT     
      const right = document.createElement('div');     
      right.className = 'ESD-buttons';     
      const editBtn = document.createElement('button');
      editBtn.className = 'esd-btn';     
      editBtn.textContent = task.isEditing ? 'Save' : 'Edit';     
      editBtn.addEventListener('click', () => {       
        if (task.isEditing) {         
        const input = li.querySelector('.edit-input');         
        task.text = input.value.trim();        
        
        task.isEditing = false;       
      } 
      else {         
        task.isEditing = true;       
      }       
      renderTasks(taskArray, taskList, allowComplete);     
    });    
    //   editBtn.id = `edit-${index}`;
    //   editBtn.addEventListener('click', () => {       
    //     if (task.isEditing) {         
    //     const input = li.querySelector('.edit-input');         
    //     task.text = input.value.trim();        
        
    //     task.isEditing = false;       
    //   } 
    //   else {         
    //     task.isEditing = true;       
    //   }       
    //   renderTasks(taskArray, taskList, allowComplete);     
    // });    

    // script for delete button 
    const deleteBtn = document.createElement('button');     
    deleteBtn.textContent = 'Delete';  
    deleteBtn.className = 'esd-btn';  
    if (!task.completed) deleteBtn.disabled = true;
    deleteBtn.addEventListener('click', () => {       
      taskArray.splice(index, 1);       
      renderTasks(taskArray, taskList, allowComplete);     
    });
    
    // script for delete button with keyboard accessibility
    li.addEventListener('keydown',(e) =>{
      if(e.key === 'Delete' && task.completed){
        taskArray.splice(index, 1);       
        renderTasks(taskArray, taskList, allowComplete);     
      }
    })     
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


/*--------------------- Timer script ---------------------------*/
// Select UI elements
const input = document.getElementById("time-set");
const increaseBtn = document.getElementById("increase-time");
const decreaseBtn = document.getElementById("decrease-time");

const startBtn = document.getElementById("start-timer");
const stopBtn = document.getElementById("stop-timer");
const resetBtn = document.getElementById("reset-timer");

let timer = null;
let remainingSeconds = 0;
let displaySpan = null;


// timeInput.addEventListener('input', (e) => {
//     // 1. Remove anything that isn't a number
//     let value = e.target.value.replace(/\D/g, ''); 
    
//     // 2. Auto-format logic
//     if (value.length > 2) {
//         // If more than 2 digits, split them: [First 2]:[Remaining]
//         e.target.value = value.slice(0, 2) + ":" + value.slice(2, 4);
//     } else {
//         e.target.value = value;
//     }
// });

// INITIAL STATE: Hide Stop and Reset until we start
// stopBtn.style.display = 'none';
// resetBtn.style.display = 'none';

// script to increase time by 5 minutes
increaseBtn.addEventListener("click", () => {
  let value = parseInt(input.value) || 0;
  if (value < 120) {
    input.value = value + 5;
  }
});

// script to decrease time by 5 minutes 
decreaseBtn.addEventListener("click", () => {
  let value = parseInt(input.value) || 0;
  if (value > 5) {
    input.value = value - 5;
  }
});

// helper function to format seconds into MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// logic to start the timer
startBtn.addEventListener("click", () => {

  if (timer) return; // prevent duplicate timers

  const minutes = parseInt(input.value);

  if (!minutes || minutes < 5) {
    alert("Enter minimum 5 minutes");
    return;
  }

  remainingSeconds = minutes * 60;

  // Replace input with span
  displaySpan = document.createElement("span");
  displaySpan.id = "timer-display";
  displaySpan.textContent = formatTime(remainingSeconds);

  input.replaceWith(displaySpan);

  // Show stop & reset
  stopBtn.style.display = "inline-block";
  resetBtn.style.display = "inline-block";

  timer = setInterval(() => {
    remainingSeconds--;
    displaySpan.textContent = formatTime(remainingSeconds);

    if (remainingSeconds <= 0) {
      clearInterval(timer);
      timer = null;
      playSound();
    }

  }, 1000);
});

// logic to stop the timer
stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

// logic to reset the timer
resetBtn.addEventListener("click", () => {

  clearInterval(timer);
  timer = null;

  remainingSeconds = 0;

  // Replace span back with input
  displaySpan.replaceWith(input);

  input.value = "";

  stopBtn.style.display = "none";
  resetBtn.style.display = "none";
});

