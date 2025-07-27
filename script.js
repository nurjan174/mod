document.addEventListener('DOMContentLoaded', async () => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: async () => {
      const response = await fetch(/api/get-events/${window.Telegram.WebApp.initDataUnsafe.user.id});
      const data = await response.json();
      return [
        ...data.periods.map(p => ({ title: 'Месячные', date: p.date, color: '#f472b6' })),
        ...data.symptoms.map(s => ({ title: s.symptom, date: s.date, color: '#60a5fa' }))
      ];
    },
    dateClick: function(info) {
      alert('Вы выбрали дату: ' + info.dateStr);
    }
  });
  calendar.render();

  // Telegram Web App
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
});

function openPeriodModal() {
  document.getElementById('periodModal').style.display = 'flex';
}

function openSymptomModal() {
  document.getElementById('symptomModal').style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

async function markPeriod() {
  const date = document.getElementById('periodDate').value;
  if (!date) return alert('Выберите дату');
  const response = await fetch('/api/mark-period', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: window.Telegram.WebApp.initDataUnsafe.user.id, date })
  });
  const data = await response.json();
  if (data.success) {
    alert('Месячные отмечены!');
    closeModal('periodModal');
    location.reload();
  }
}

async function markSymptom() {
  const symptom = document.getElementById('symptomType').value;
  const date = document.getElementById('symptomDate').value;
  if (!symptom || !date) return alert('Заполните все поля');
  const response = await fetch('/api/mark-symptom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: window.Telegram.WebApp.initDataUnsafe.user.id, symptom, date })
  });
  const data = await response.json();
  if (data.success) {
    alert('Симптом добавлен!');
    closeModal('symptomModal');
    location.reload();
  }
}
