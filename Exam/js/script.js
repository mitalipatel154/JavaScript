let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(taskArray = tasks){
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    if (taskArray.length === 0) {
        list.innerHTML = "<p>No tasks available.</p>";
        return;
    }
    taskArray.forEach((task, index) => {
        const div = document.createElement("div");
        div.classList.add("task");

        div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Due:</strong> ${task.dueDate}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <button class="edit-btn" onclick="editTask(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
        list.appendChild(div);
    });
}

function addTask(){
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (title === "" || dueDate === "") 
    {
        alert("Please enter a title and due date.");
        return;
    }

    const newTask = { title, description, dueDate, priority };

    if (editIndex === -1) 
    {
        tasks.push(newTask);
    }
    else 
    {
        tasks[editIndex] = newTask;
        editIndex = -1;
    }

    saveTasks();
    clearFields();
    displayTasks();
}

function editTask(index){
    const task = tasks[index];
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;

    editIndex = index;
}

function deleteTask(index){
    if (confirm("Are you sure you want to delete this task?")) 
    {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

function clearFields(){
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "low";
}

function filterTasks(){
    const selectedPriority = document.getElementById("filterPriority").value;
    if (selectedPriority === "all") 
    {
        displayTasks(tasks);
    } 
    else 
    {
        const filtered = tasks.filter(task => task.priority === selectedPriority);
        displayTasks(filtered);
    }
}

function searchTasks(){
    const keyword = document.getElementById("searchBox").value.toLowerCase();
    const filtered = tasks.filter(task => task.title.toLowerCase().includes(keyword));
    displayTasks(filtered);
}

window.onload = () => {
    displayTasks();
};
