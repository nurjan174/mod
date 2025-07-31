// app.js
let currentUser = null;
let userData = {
    balance: 0,
    referrals: 0,
    completedTasks: 0
};

// Telegram Auth callback
function onTelegramAuth(user) {
    currentUser = user;
    localStorage.setItem('telegramUser', JSON.stringify(user));
    document.getElementById('telegram-login').style.display = 'none';
    initializeApp();
}

// Initialize app after authentication
function initializeApp() {
    loadUserData();
    showSection('profile');
    updateUI();
}

// Load user data (mock data for demonstration)
function loadUserData() {
    // In a real app, this would be an API call
    userData = {
        balance: 100,
        referrals: 5,
        completedTasks: 3
    };
    updateUI();
}

// Update UI elements
function updateUI() {
    document.getElementById('balance').textContent = userData.balance;
    document.getElementById('referrals').textContent = userData.referrals;
    document.getElementById('completed-tasks').textContent = userData.completedTasks;
    
    if (currentUser) {
        document.getElementById('username').textContent = currentUser.first_name;
        document.getElementById('profile-photo').src = currentUser.photo_url || 'default-avatar.png';
    }
}

// Show different sections
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.remove('hidden');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showSection('${sectionName}')"]`).classList.add('active');

    // Load section content
    switch(sectionName) {
        case 'tasks':
            loadTasks();
            break;
        case 'shop':
            loadShop();
            break;
    }
}

// Load tasks
function loadTasks() {
    const tasks = [
        { id: 1, title: "Подпишись на канал", description: "Подпишись и получи награду", reward: 10 },
        { id: 2, title: "Пригласи друга", description: "Приведи нового пользователя", reward: 5 },
    ];

    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="item-info">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Награда: ${task.reward} токенов</p>
            </div>
            <button class="action-btn" onclick="completeTask(${task.id})">Выполнить</button>
        </div>
    `).join('');
}

// Load shop items
function loadShop() {
    const items = [
        { id: 1, title: "Стикеры", description: "Набор классных стикеров", price: 50 },
        { id: 2, title: "VIP статус", description: "Особый статус на неделю", price: 100 },
    ];

    const shopEl = document.getElementById('shop-items');
    shopEl.innerHTML = items.map(item => `
        <div class="shop-item">
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>Цена: ${item.price} токенов</p>
            </div>
            <button class="action-btn" onclick="buyItem(${item.id})">Купить</button>
        </div>
    `).join('');
}

// Complete task handler
function completeTask(taskId) {
    // Add API call here
    userData.balance += 10;
    userData.completedTasks += 1;
    updateUI();
    alert(`Задание ${taskId} выполнено! +10 токенов`);
}

// Buy item handler
function buyItem(itemId) {
    const prices = {1: 50, 2: 100};
    if (userData.balance >= prices[itemId]) {
        userData.balance -= prices[itemId];
        updateUI();
        alert(`Товар успешно куплен!`);
    } else {
        alert('Недостаточно токенов!');
    }
}

// Check for existing session
window.onload = () => {
    const savedUser = localStorage.getItem('telegramUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('telegram-login').style.display = 'none';
        initializeApp();
    }
};
