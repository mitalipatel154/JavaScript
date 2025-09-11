class Task {
    constructor({ id, title, description = '', category = 'General', dueDate = null, type = 'task', status = 'pending' }) {
        this.id = id || Date.now() + Math.floor(Math.random() * 1000);
        this.title = title;
        this.description = description;
        this.category = category;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.type = type;
        this.status = status;
    }
    markComplete() { this.status = 'completed'; }
    markPending() { this.status = 'pending'; }
    isOverdue() {
        if (!this.dueDate) return false;
        const today = new Date();
        const due = new Date(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate());
        const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return (due < t) && this.status !== 'completed';
    }
    update({ title, description, category, dueDate }) {
        if (title) this.title = title;
        if (description) this.description = description;
        if (category) this.category = category;
        if (dueDate) this.dueDate = new Date(dueDate);
    }
}

class SpecialHabit extends Task {
    constructor(opts) {
        super(opts);
        this.frequency = opts.frequency || 'daily';
    }
}

let tasks = [];

const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasksContainer');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const overdueTasksEl = document.getElementById('overdueTasks');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const categoryFilter = document.getElementById('categoryFilter');

function renderDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => t.isOverdue()).length;
    const pending = total - completed;
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
    overdueTasksEl.textContent = overdue;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressBar.style.width = percent + '%';
    progressText.textContent = 'Progress: ' + percent + '%';
}

function renderTasks() {
    tasksContainer.innerHTML = '';
    const s = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const cat = categoryFilter.value;

    const filtered = tasks.filter(task => {
        if (s && !task.title.toLowerCase().includes(s) && !task.category.toLowerCase().includes(s)) return false;
        if (status === 'pending' && task.status !== 'pending') return false;
        if (status === 'completed' && task.status !== 'completed') return false;
        if (status === 'overdue' && !task.isOverdue()) return false;
        if (cat !== 'all' && task.category !== cat) return false;
        return true;
    });

    if (filtered.length === 0) {
        tasksContainer.innerHTML = '<p class="text-muted">No tasks found</p>';
    }

    filtered.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-card';
        const left = document.createElement('div');
        left.className = 'task-info';
        left.innerHTML = `<strong>${task.title}</strong><br>${task.description}<br><small>Category: ${task.category} | Due: ${task.dueDate ? task.dueDate.toLocaleDateString() : '-'}</small>`;

        const right = document.createElement('div');
        const statusSpan = document.createElement('span');
        statusSpan.className = 'task-status ' + (task.status === 'completed' ? 'status-completed' : (task.isOverdue() ? 'status-overdue' : 'status-pending'));
        statusSpan.textContent = task.status === 'completed' ? 'Completed' : (task.isOverdue() ? 'Overdue' : 'Pending');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.status === 'completed' ? 'Unmark' : 'Complete';
        completeBtn.className = 'btn btn-sm btn-success ms-2';
        completeBtn.onclick = () => { task.status === 'completed' ? task.markPending() : task.markComplete(); updateAndRerender(); };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-sm btn-danger ms-2';
        deleteBtn.onclick = () => { deleteTask(task.id); };

        right.appendChild(statusSpan);
        right.appendChild(completeBtn);
        right.appendChild(deleteBtn);

        div.appendChild(left);
        div.appendChild(right);
        tasksContainer.appendChild(div);
    });

    renderDashboard();
}

function addTask(data) {
    const obj = data.type === 'habit' ? new SpecialHabit(data) : new Task(data);
    tasks.push(obj);
    updateAndRerender();
}

function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); updateAndRerender(); }
function findTask(id) { return tasks.find(t => t.id === id); }

function updateAndRerender() {
    refreshCategoryFilter();
    renderTasks();
}

function refreshCategoryFilter() {
    const cats = [...new Set(tasks.map(t => t.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        categoryFilter.appendChild(opt);
    });
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim() || 'General';
    const dueDate = document.getElementById('dueDate').value || null;
    const type = document.getElementById('type').value;
    if (!title) return alert('Title required');
    addTask({ title, description, category, dueDate, type });
    taskForm.reset();
});

searchInput.addEventListener('input', () => renderTasks());
statusFilter.addEventListener('change', () => renderTasks());
categoryFilter.addEventListener('change', () => renderTasks());