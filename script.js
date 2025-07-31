     const user = window.Telegram.WebApp.initDataUnsafe.user;
     if (user) {
       const userId = user.id;
       const username = user.username || 'Нет имени';
       const avatar = user.photo_url || 'default_avatar.png';
       document.getElementById('profile').innerHTML = `
         <img src="${avatar}" alt="Аватар" width="100"/>
         <p>Ник: ${username}</p>
         <p>ID: ${userId}</p>
       `;
     }
     
