const tg = window.Telegram.WebApp;
tg.ready();

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
        }
    }
}

// Пример получения данных о подарках через Telegram API
async function fetchGifts() {
    try {
        const response = await fetch('https://api.telegram.org/bot<7042496389:AAFdyDdUoqrwmarqaajjBTEw3Z8M0K0DWk4>/getUserProfilePhotos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: tg.initDataUnsafe.user.id,
                limit: 1
            })
        });
        const data = await response.json();
        if (data.ok) {
            console.log('Gifts data:', data);
            const giftCount = data.result.total_count || 0;
            document.querySelector('.stats .stat:nth-child(2)').textContent = ${giftCount} <img src="https://via.placeholder.com/20?text=🎁" alt="gift">;
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
    tg.openLink('https://t.me/your_bot?start=gift'); // Переход к боту для отправки подарка
});
