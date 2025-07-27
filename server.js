const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/cycle_calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Схема данных
const CycleSchema = new mongoose.Schema({
  userId: String,
  periods: [{ date: String }],
  symptoms: [{ date: String, symptom: String }]
});
const Cycle = mongoose.model('Cycle', CycleSchema);

// Отметка месячных
app.post('/api/mark-period', async (req, res) => {
  const { userId, date } = req.body;
  let userCycle = await Cycle.findOne({ userId });
  if (!userCycle) {
    userCycle = new Cycle({ userId, periods: [], symptoms: [] });
  }
  userCycle.periods.push({ date });
  await userCycle.save();
  res.json({ success: true });
});

// Добавление симптомов
app.post('/api/mark-symptom', async (req, res) => {
  const { userId, symptom, date } = req.body;
  let userCycle = await Cycle.findOne({ userId });
  if (!userCycle) {
    userCycle = new Cycle({ userId, periods: [], symptoms: [] });
  }
  userCycle.symptoms.push({ date, symptom });
  await userCycle.save();
  res.json({ success: true });
});

// Получение событий для календаря
app.get('/api/get-events/:userId', async (req, res) => {
  const userCycle = await Cycle.findOne({ userId: req.params.userId });
  if (!userCycle) {
    return res.json({ periods: [], symptoms: [] });
  }
  res.json(userCycle);
});

// Прогноз овуляции
app.get('/api/predict-ovulation/:userId', async (req, res) => {
  const userCycle = await Cycle.findOne({ userId: req.params.userId });
  if (!userCycle || userCycle.periods.length < 2) {
    return res.json({ error: 'Недостаточно данных для прогноза' });
  }
  const cycleLength = 28; // Можно улучшить, вычисляя среднюю длину цикла
  const lastPeriod = new Date(userCycle.periods[userCycle.periods.length - 1].date);
  const ovulationDate = new Date(lastPeriod);
  ovulationDate.setDate(lastPeriod.getDate() + cycleLength / 2);
  res.json({ ovulationDate: ovulationDate.toISOString().split('T')[0] });
});

app.listen(3000, () => console.log('Server running on port 3000'));
