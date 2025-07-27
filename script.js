let currentDate = new Date();
const calendarEl = document.getElementById('calendar');
const monthEl = document.getElementById('month');

const tg = window.Telegram.WebApp;
tg.ready();
const user = tg.initDataUnsafe?.user;
document.getElementById("username").textContent = Привет, ${user?.first_name || "гость"}!;

function renderCalendar() {
  calendarEl.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthEl.textContent = currentDate.toLocaleDateString('ru-RU', {
    month: 'long', year: 'numeric'
  });

  // Пустые ячейки до первого дня недели
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    const empty = document.createElement("div");
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;

    const key = ${year}-${month}-${day};
    if (localStorage.getItem(key)) {
      dayEl.classList.add("selected");
    }

    dayEl.addEventListener("click", () => {
      if (dayEl.classList.contains("selected")) {
        dayEl.classList.remove("selected");
        localStorage.removeItem(key);
      } else {
        dayEl.classList.add("selected");
        localStorage.setItem(key, "1");
      }
    });

    calendarEl.appendChild(dayEl);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();
