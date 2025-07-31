const tg = window.Telegram.WebApp;
tg.ready();

const BOT_TOKEN = '7042496389:AAFdyDdUoqrwmarqaajjBTEw3Z8M0K0DWk4'; // Ваш токен бота

// Функция для отображения профиля пользователя
function displayUserProfile() {
    const user = tg.initDataUnsafe.user;
    if (user) {
        // Установка имени пользователя
        const usernameElement = document.querySelector('.username');
        usernameElement.textContent = user.username || User_${user.id};

        // Установка фотографии профиля
        const profilePicElement = document.querySelector('.profile-pic');
        if (user.photo_url) {
            profilePicElement.style.backgroundImage = url(${user.photo_url});
        } else {
            profilePicElement.style.backgroundImage = url('https://via.placeholder.com/100'); // Заглушка
        }

        // Установка баланса (пример)
        const balanceElement = document.querySelector('.stats .stat:nth-child(1)');
        balanceElement.textContent = ${user.id} <span class="logo"></span>; // Замените на реальные данные
    } else {
        console.error('User data not available');
    }
}

// Функция для получения данных о подарках
async function fetchGifts() {
    try {
        const response = await fetch(https://api.telegram.org/bot${BOT_TOKEN}/getUpdates, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                offset: -1, // Получаем последние обновления
                timeout: 0
            })
        });
        const data = await response.json();
        if (data.ok) {
            // Подсчет сообщений с командой /gift
            const giftCount = data.result.filter(update => 
                update.message?.text?.toLowerCase() === '/gift'
            ).length || 0;
            document.querySelector('.stats .stat:nth-child(2)').textContent = ${giftCount} <img src="https://via.placeholder.com/20?text=🎁" alt="gift">;
            document.querySelector('.gift-counter').textContent = giftCount > 0 ? giftCount : '0.02';
        } else {
            console.error('API error:', data.description);
        }
    } catch (error) {
        console.error('Error fetching gifts:', error);
    }
}

// Вызов функций при загрузке
displayUserProfile();
fetchGifts();

// Обработчик клика на кнопку подарков
document.querySelector('.gift-btn').addEventListener('click', () => {
    tg.openLink('https://t.me/MODKABot?start=gift'); // Ссылка на ваш бот
});

// Обновление данных каждые 10 секунд
setInterval(() => {
    fetchGifts();
}, 10000);
