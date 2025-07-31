// app.js
let currentUser = null;

// Telegram Auth callback
function onTelegramAuth(user) {
    currentUser = user;
    localStorage.setItem('telegramUser', JSON.stringify(user));
    showUserInterface();
}

// Show UI after authentication
function showUserInterface() {
    document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
    loadUserProfile();
    loadTasks();
    loadLeaderboard();
    loadShop();
}

// Load user profile
function loadUserProfile() {
    // Mock data - replace with actual API calls
    const profile = {
        balance: 100,
        referrals: 5
    };
    
    document.getElementById('balance').textContent = profile.balance;
    document.getElementById('referrals').textContent = profile.referrals;
}

// Load available tasks
function loadTasks() {
    // Mock tasks data
    const tasks = [
        { id: 1, title: "Подпишись на канал", reward: 10 },
        { id: 2, title: "Пригласи друга", reward: 5 },
    ];

    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <h3>${task.title}</h3>
            <p>Награда: ${task.reward} токенов</p>
            <button onclick="completeTask(${task.id})">Выполнить</button>
        </div>
    `).join('');
}

// Load leaderboard
function loadLeaderboard() {
    // Mock leaderboard data
    const topPlayers = [
        { name: "Player 1", balance: 500 },
        { name: "Player 2", balance: 400 },
    ];

    const leaderboardEl = document.getElementById('top-players');
    leaderboardEl.innerHTML = topPlayers.map((player, index) => `
        <div class="player-item">
            <p>${index + 1}. ${player.name} - ${player.balance} токенов</p>
        </div>
    `).join('');
}

// Load shop items
function loadShop() {
    // Mock shop data
    const items = [
        { id: 1, title: "Стикеры", price: 50 },
        { id: 2, title: "VIP статус", price: 100 },
    ];

    const shopEl = document.getElementById('shop-items');
    shopEl.innerHTML = items.map(item => `
        <div class="shop-item">
            <h3>${item.title}</h3>
            <p>Цена: ${item.price} токенов</p>
            <button onclick="buyItem(${item.id})">Купить</button>
        </div>
    `).join('');
}

// Task completion handler
function completeTask(taskId) {
    // Add API call here
    alert(`Задание ${taskId} выполнено!`);
    loadUserProfile(); // Refresh profile
}

// Shop purchase handler
function buyItem(itemId) {
    // Add API call here
    alert(`Товар ${itemId} куплен!`);
    loadUserProfile(); // Refresh profile
}

// Check for existing session
window.onload = () => {
    const savedUser = localStorage.getItem('telegramUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserInterface();
    }
};
