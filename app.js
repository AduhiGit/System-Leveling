// Игровые данные
let stats = {
  pushUps: 0,
  sitUps: 0,
  squats: 0,
  running: 0,
  plank: 0,
  level: 1,
  xp: 0,
  totalXp: 0,
  maxXp: 250,
  streak: 0,
  maxStreak: 0,
  lastCompleted: null,
  lastQuestRefresh: null,
  
  targets: {
    pushUps: 100,
    sitUps: 100,
    squats: 100,
    running: 10,
    plank: 1
  },
  
  totals: {
    pushUps: 0,
    sitUps: 0,
    squats: 0,
    running: 0,
    plank: 0,
    workouts: 0
  },
  
  records: {
    pushUps: 0,
    sitUps: 0,
    squats: 0,
    running: 0,
    plank: 0
  },
  
  attributes: {
    strength: 0,
    stamina: 0,
    speed: 0
  },
  
  dailyQuests: []
};

// Все возможные квесты (30 вариантов)
const allQuests = [
  {
    id: 1,
    name: "20 отжиманий",
    type: "strength",
    reward: 3,
    xp: 50,
    difficulty: "C",
    desc: "Сделай 20 отжиманий за подход",
    instructions: "1. Примите упор лежа\n2. Руки на ширине плеч\n3. Опускайтесь до угла 90° в локтях\n4. Поднимайтесь полностью выпрямляя руки\n\nСовет: Держите корпус напряженным, не прогибайтесь в пояснице"
  },
  {
    id: 2,
    name: "30 приседаний",
    type: "stamina",
    reward: 2,
    xp: 40,
    difficulty: "D",
    desc: "30 приседаний без остановки",
    instructions: "1. Ноги на ширине плеч\n2. Спина прямая\n3. Опускайтесь до параллели бедер с полом\n4. Колени не выходят за носки\n\nСовет: Переносите вес на пятки, не отрывайте их от пола"
  },
  {
    id: 3,
    name: "Берпи (10 раз)",
    type: "speed",
    reward: 4,
    xp: 80,
    difficulty: "B",
    desc: "Выполни 10 берпи за минуту",
    instructions: "1. Из положения стоя присядьте\n2. Упритесь руками в пол\n3. Отпрыгните ногами назад в планку\n4. Вернитесь в присед и выпрыгните вверх\n\nСовет: Сохраняйте ритм, не задерживайте дыхание"
  },
  {
    id: 4,
    name: "Планка 2 мин",
    type: "stamina",
    reward: 3,
    xp: 60,
    difficulty: "C",
    desc: "Держи планку 2 минуты",
    instructions: "1. Локти под плечами\n2. Тело образует прямую линию\n3. Напрягите пресс и ягодицы\n4. Не прогибайтесь в пояснице\n\nСовет: Дышите ровно, распределяйте нагрузку"
  },
  {
    id: 5,
    name: "Подъемы корпуса",
    type: "strength",
    reward: 2,
    xp: 45,
    difficulty: "D",
    desc: "30 подъемов корпуса",
    instructions: "1. Лежа на спине, ноги согнуты\n2. Руки за головой\n3. Поднимайте корпус до угла 45°\n4. Медленно опускайтесь\n\nСовет: Не тяните голову руками, работайте прессом"
  },
  {
    id: 6,
    name: "Прыжки на месте",
    type: "speed",
    reward: 1,
    xp: 30,
    difficulty: "E",
    desc: "100 прыжков за 5 минут",
    instructions: "1. Ноги вместе, руки вдоль тела\n2. Подпрыгивайте на 10-15 см\n3. Приземляйтесь на носки\n\nСовет: Сохраняйте легкий темп, можно прыгать на одной ноге"
  },
  {
    id: 7,
    name: "Отжимания с хлопком",
    type: "strength",
    reward: 5,
    xp: 100,
    difficulty: "A",
    desc: "10 взрывных отжиманий",
    instructions: "1. Стандартное отжимание\n2. В верхней точке оттолкнитесь и хлопните\n3. Мягко приземлитесь\n\nСовет: Начинайте с малой амплитуды, постепенно увеличивайте"
  },
  {
    id: 8,
    name: "Скалолаз",
    type: "speed",
    reward: 3,
    xp: 70,
    difficulty: "C",
    desc: "50 повторений упражнения 'скалолаз'",
    instructions: "1. Позиция планки\n2. Поочередно подтягивайте колени к груди\n3. Сохраняйте быстрый темп\n\nСовет: Держите корпус напряженным, не раскачивайтесь"
  },
  {
    id: 9,
    name: "Приседания с прыжком",
    type: "strength",
    reward: 4,
    xp: 90,
    difficulty: "B",
    desc: "15 приседаний с выпрыгиванием",
    instructions: "1. Стандартное приседание\n2. В верхней точке выпрыгните вверх\n3. Мягко приземлитесь\n\nСовет: Контролируйте приземление, сгибайте колени"
  },
  {
    id: 10,
    name: "Подтягивания",
    type: "strength",
    reward: 6,
    xp: 120,
    difficulty: "A",
    desc: "5 подтягиваний",
    instructions: "1. Хват на ширине плеч\n2. Подтягивайтесь до подбородка над перекладиной\n3. Медленно опускайтесь\n\nСовет: Не раскачивайтесь, работайте мышцами спины"
  },
  {
    id: 11,
    name: "Отжимания в стойке",
    type: "strength",
    reward: 7,
    xp: 150,
    difficulty: "S",
    desc: "5 отжиманий у стены вниз головой",
    instructions: "1. Стойка на руках у стены\n2. Медленно сгибайте локти до 90°\n3. Возвращайтесь в исходное положение\n\nСовет: Требуется хорошая подготовка, можно начать с упрощенного варианта"
  },
  {
    id: 12,
    name: "Пистолетики",
    type: "strength",
    reward: 8,
    xp: 180,
    difficulty: "S",
    desc: "5 приседаний на одной ноге",
    instructions: "1. Одна нога вытянута вперед\n2. Медленно приседайте на одной ноге\n3. Возвращайтесь в исходное положение\n\nСовет: Можно держаться за опору, постепенно уменьшая поддержку"
  },
  {
    id: 13,
    name: "Бурпи",
    type: "strength",
    reward: 5,
    xp: 110,
    difficulty: "B",
    desc: "10 бурпи за 3 минуты",
    instructions: "1. Из положения стоя - присед\n2. Упор лежа - отжимание\n3. Подтяните ноги к рукам\n4. Выпрыгните вверх\n\nСовет: Сохраняйте последовательность движений"
  },
  {
    id: 14,
    name: "Альпинист",
    type: "strength",
    reward: 4,
    xp: 85,
    difficulty: "C",
    desc: "50 повторений упражнения 'альпинист'",
    instructions: "1. Позиция планки\n2. Поочередно подтягивайте колени к груди\n3. Увеличивайте темп\n\nСовет: Работайте прессом, не прогибайте поясницу"
  },
  {
    id: 15,
    name: "Планш",
    type: "strength",
    reward: 6,
    xp: 130,
    difficulty: "A",
    desc: "Удержание планша 10 секунд",
    instructions: "1. Упор лежа на пальцах\n2. Тело параллельно полу\n3. Удерживайте положение\n\nСовет: Начинайте с нескольких секунд, постепенно увеличивая время"
  },
  {
    id: 16,
    name: "Бег на месте",
    type: "stamina",
    reward: 3,
    xp: 65,
    difficulty: "D",
    desc: "3 минуты интенсивного бега",
    instructions: "1. Бег на месте с высоким подниманием колен\n2. Активно работайте руками\n3. Сохраняйте темп\n\nСовет: Дышите равномерно, не задерживайте дыхание"
  },
  {
    id: 17,
    name: "Стульчик у стены",
    type: "stamina",
    reward: 4,
    xp: 75,
    difficulty: "C",
    desc: "Удержание 1 минуту",
    instructions: "1. Прислонитесь спиной к стене\n2. Согните ноги до 90°\n3. Удерживайте положение\n\nСовет: Распределяйте вес равномерно, не задерживайте дыхание"
  },
  {
    id: 18,
    name: "Велосипед",
    type: "stamina",
    reward: 3,
    xp: 55,
    difficulty: "D",
    desc: "50 вращений ногами лежа",
    instructions: "1. Лежа на спине, руки за головой\n2. Поочередно подтягивайте колени к локтям\n3. Сохраняйте темп\n\nСовет: Работайте прессом, не тяните шею руками"
  },
  {
    id: 19,
    name: "Лодочка",
    type: "stamina",
    reward: 2,
    xp: 45,
    difficulty: "E",
    desc: "Удержание 45 секунд",
    instructions: "1. Лежа на животе, руки вперед\n2. Одновременно поднимите руки и ноги\n3. Удерживайте положение\n\nСовет: Напрягайте мышцы спины и ягодиц"
  },
  {
    id: 20,
    name: "Толчки в стену",
    type: "stamina",
    reward: 4,
    xp: 70,
    difficulty: "C",
    desc: "100 толчков ладонями в стену",
    instructions: "1. Встаньте в шаге от стены\n2. Быстро отталкивайтесь ладонями от стены\n3. Сохраняйте ритм\n\nСовет: Работайте мышцами груди и рук"
  },
  {
    id: 21,
    name: "Ходьба выпадами",
    type: "stamina",
    reward: 5,
    xp: 95,
    difficulty: "B",
    desc: "20 выпадов на месте",
    instructions: "1. Шаг вперед, сгибайте оба колена до 90°\n2. Возвращайтесь в исходное положение\n3. Чередуйте ноги\n\nСовет: Следите за коленом - не выходит за носок"
  },
  {
    id: 22,
    name: "Супермен",
    type: "stamina",
    reward: 3,
    xp: 60,
    difficulty: "D",
    desc: "Удержание 1 минуту",
    instructions: "1. Лежа на животе, руки вперед\n2. Одновременно поднимите руки и ноги\n3. Удерживайте положение\n\nСовет: Напрягайте мышцы спины и ягодиц"
  },
  {
    id: 23,
    name: "Скакалка",
    type: "stamina",
    reward: 4,
    xp: 80,
    difficulty: "C",
    desc: "100 прыжков без остановки",
    instructions: "1. Прыжки через скакалку\n2. Сохраняйте ритм\n3. Приземляйтесь на носки\n\nСовет: Можно имитировать скакалку без инвентаря"
  },
  {
    id: 24,
    name: "Прыжки в длину",
    type: "speed",
    reward: 2,
    xp: 50,
    difficulty: "D",
    desc: "10 прыжков в длину с места",
    instructions: "1. Из полуприседа мах руками и прыжок вперед\n2. Мягко приземляйтесь\n3. Возвращайтесь обратно\n\nСовет: Работайте ногами и корпусом одновременно"
  },
  {
    id: 25,
    name: "Быстрые отжимания",
    type: "speed",
    reward: 3,
    xp: 70,
    difficulty: "C",
    desc: "20 отжиманий за 1 минуту",
    instructions: "1. Стандартные отжимания\n2. Увеличьте темп\n3. Сохраняйте технику\n\nСовет: Не жертвуйте техникой ради скорости"
  },
  {
    id: 26,
    name: "Челночный бег",
    type: "speed",
    reward: 5,
    xp: 100,
    difficulty: "B",
    desc: "10 отрезков по 5 метров",
    instructions: "1. Быстрый бег на короткую дистанцию\n2. Резкая смена направления\n3. Сохраняйте баланс\n\nСовет: Тормозите перед поворотом, не скользите"
  },
  {
    id: 27,
    name: "Плиометрика",
    type: "speed",
    reward: 4,
    xp: 90,
    difficulty: "B",
    desc: "15 прыжков на возвышение",
    instructions: "1. Прыжки на тумбу или ступеньку\n2. Мягкое приземление\n3. Быстрое отталкивание\n\nСовет: Начинайте с небольшой высоты"
  },
  {
    id: 28,
    name: "Быстрые приседания",
    type: "speed",
    reward: 3,
    xp: 65,
    difficulty: "C",
    desc: "30 приседаний за 1 минуту",
    instructions: "1. Стандартные приседания\n2. Увеличьте темп\n3. Сохраняйте технику\n\nСовет: Не выпрямляйте колени полностью"
  },
  {
    id: 29,
    name: "Ускорения",
    type: "speed",
    reward: 6,
    xp: 130,
    difficulty: "A",
    desc: "5 спринтов по 10 секунд",
    instructions: "1. Максимально быстрый бег на месте\n2. Работайте руками\n3. 10 секунд работы, 20 отдых\n\nСовет: Сохраняйте технику даже на высокой скорости"
  },
  {
    id: 30,
    name: "Реакция",
    type: "speed",
    reward: 2,
    xp: 40,
    difficulty: "E",
    desc: "10 касаний пола за 30 сек",
    instructions: "1. Быстро касайтесь пола поочередно руками\n2. Сохраняйте ритм\n3. Можно в планке\n\nСовет: Работайте на скорость, но контролируйте движения"
  }
];

// Инициализация игры
function initGame() {
  loadStats();
  checkDailyQuestsRefresh();
  generateDailyQuests();
  updateDisplay();
}

// Загрузка статистики
function loadStats() {
  const saved = localStorage.getItem('fitnessRPG');
  if (saved) {
    const parsed = JSON.parse(saved);
    
    // Миграция для старых версий
    if (!parsed.attributes) {
      parsed.attributes = { strength: 0, stamina: 0, speed: 0 };
    }
    if (!parsed.dailyQuests) {
      parsed.dailyQuests = [];
    }
    if (!parsed.lastQuestRefresh) {
      parsed.lastQuestRefresh = null;
    }
    
    const levelDiff = parsed.level - 1;
    stats = {
      ...parsed,
      targets: {
        pushUps: 100 + (20 * levelDiff),
        sitUps: 100 + (20 * levelDiff),
        squats: 100 + (20 * levelDiff),
        running: 10,
        plank: 1 + levelDiff
      },
      maxXp: 250 + (250 * (parsed.level - 1))
    };
    
    checkStreak();
  }
}

// Проверка обновления квестов
function checkDailyQuestsRefresh() {
  const today = new Date().toDateString();
  if (!stats.lastQuestRefresh || stats.lastQuestRefresh !== today) {
    stats.lastQuestRefresh = today;
    generateDailyQuests();
  }
}

// Генерация ежедневных квестов
function generateDailyQuests() {
  const availableQuests = allQuests.filter(quest => 
    !stats.dailyQuests.some(q => q.id === quest.id && q.completed) || Math.random() < 0.3
  );
  
  const shuffled = [...availableQuests].sort(() => 0.5 - Math.random());
  const strengthQuests = shuffled.filter(q => q.type === 'strength').slice(0, 3);
  const staminaQuests = shuffled.filter(q => q.type === 'stamina').slice(0, 3);
  const speedQuests = shuffled.filter(q => q.type === 'speed').slice(0, 3);
  
  stats.dailyQuests = [...strengthQuests, ...staminaQuests, ...speedQuests]
    .slice(0, 8)
    .map(quest => ({ ...quest, completed: false }));
  
  renderDailyQuests();
}

// Отображение квестов
function renderDailyQuests() {
  const container = document.getElementById('daily-quests-container');
  container.innerHTML = '';
  
  stats.dailyQuests.forEach(quest => {
    const questEl = document.createElement('div');
    questEl.className = `quest-card ${quest.completed ? 'completed' : ''}`;
    questEl.dataset.type = quest.type;
    questEl.dataset.difficulty = quest.difficulty;
    
    questEl.innerHTML = `
      <div class="quest-header">
        <h4>${quest.name}</h4>
        <span class="difficulty-badge ${quest.difficulty}">${quest.difficulty}</span>
      </div>
      <p>${quest.desc}</p>
      <div class="quest-info">
        <span class="quest-type">${getTypeIcon(quest.type)} ${quest.type}</span>
        <span class="quest-reward">+${quest.reward} ${getTypeIcon(quest.type)} +${quest.xp} XP</span>
      </div>
      <div class="quest-actions">
        <button class="info-btn" onclick="showExerciseInstructions(${quest.id})">
          ℹ️ Подробнее
        </button>
        ${quest.completed ? 
          '<div class="quest-completed">✅ Успешно выполнено</div>' : 
          `<button onclick="completeQuest(${quest.id})">Выполнить</button>`
        }
      </div>
    `;
    container.appendChild(questEl);
  });
}

// Показать инструкции к упражнению
function showExerciseInstructions(questId) {
  const quest = allQuests.find(q => q.id === questId);
  if (!quest) return;

  const modal = document.createElement('div');
  modal.className = 'exercise-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${quest.name} <span class="difficulty-badge ${quest.difficulty}">${quest.difficulty}</span></h3>
      <div class="instructions">
        <h4>Как выполнять:</h4>
        <pre>${quest.instructions}</pre>
      </div>
      <button onclick="this.parentElement.parentElement.remove()">Закрыть</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Завершение квеста
function completeQuest(questId) {
  const quest = allQuests.find(q => q.id === questId);
  const dailyQuest = stats.dailyQuests.find(q => q.id === questId);
  
  if (!quest || !dailyQuest || dailyQuest.completed) return;

  dailyQuest.completed = true;
  dailyQuest.completedAt = new Date().toISOString();
  
  stats.attributes[quest.type] += quest.reward;
  stats.xp += quest.xp;
  stats.totalXp += quest.xp;
  
  if (stats.xp >= stats.maxXp) {
    levelUp();
  }

  updateDisplay();
  renderDailyQuests();
  saveStats();
  
  showNotification(
    `✅ ${quest.name} (${quest.difficulty}) выполнено! +${quest.reward} ${getTypeIcon(quest.type)} +${quest.xp} XP`
  );
  
  document.getElementById('sound-complete').play();
}

// Переключение вкладок
function openTab(tabName) {
  const tabs = document.getElementsByClassName('tab');
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  
  updateDisplay();
}

// Сохранение данных
function saveStats() {
  localStorage.setItem('fitnessRPG', JSON.stringify(stats));
}

// Проверка серии дней
function checkStreak() {
  const today = new Date().toDateString();
  const last = stats.lastCompleted ? new Date(stats.lastCompleted).toDateString() : null;
  
  if (last === today) return;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (last === yesterday.toDateString()) {
    stats.streak++;
    if (stats.streak > stats.maxStreak) {
      stats.maxStreak = stats.streak;
    }
  } else if (last !== today && last !== null) {
    stats.streak = 0;
  }
  
  checkAchievements();
}

// Проверка достижений
function checkAchievements() {
  if (stats.streak >= 1) document.getElementById('day1').style.display = 'block';
  if (stats.streak >= 3) document.getElementById('day3').style.display = 'block';
  if (stats.streak >= 7) document.getElementById('day7').style.display = 'block';
  if (stats.level >= 5) document.getElementById('level5').style.display = 'block';
  if (stats.level >= 10) document.getElementById('level10').style.display = 'block';
  if (stats.totals.pushUps >= 500) document.getElementById('pushup500').style.display = 'block';
  if (stats.totals.squats >= 500) document.getElementById('squat500').style.display = 'block';
  if (stats.totals.running >= 50) document.getElementById('run50').style.display = 'block';
  if (stats.totals.plank >= 10) document.getElementById('plank10').style.display = 'block';
}

// Добавление повторений
function addReps(type, amount) {
  const statKey = type === 'push-ups' ? 'pushUps' : 
                 type === 'sit-ups' ? 'sitUps' :
                 type === 'squats' ? 'squats' :
                 type === 'running' ? 'running' : 'plank';
  
  stats[statKey] += amount;
  const target = stats.targets[statKey];
  if (stats[statKey] > target) stats[statKey] = target;
  
  if (stats[statKey] > stats.records[statKey]) {
    stats.records[statKey] = stats[statKey];
  }
  
  updateDisplay();
  
  if (stats[statKey] % (type === 'running' || type === 'plank' ? 1 : 10) === 0) {
    document.getElementById('sound-complete').play();
  }
}

// Завершение или сброс квеста
function completeOrResetQuest() {
  const allCompleted = stats.pushUps >= stats.targets.pushUps &&
                     stats.sitUps >= stats.targets.sitUps &&
                     stats.squats >= stats.targets.squats &&
                     stats.running >= stats.targets.running &&
                     stats.plank >= stats.targets.plank;
  
  if (allCompleted) {
    stats.xp += 100;
    stats.totalXp += 100;
    
    stats.totals.pushUps += stats.pushUps;
    stats.totals.sitUps += stats.sitUps;
    stats.totals.squats += stats.squats;
    stats.totals.running += stats.running;
    stats.totals.plank += stats.plank;
    stats.totals.workouts++;
    
    stats.attributes.strength += 2;
    stats.attributes.stamina += 1;
    stats.attributes.speed += 0.5;
    
    if (stats.xp >= stats.maxXp) {
      levelUp();
    }
    
    stats.lastCompleted = new Date().toISOString();
    checkStreak();
    saveStats();
    updateDisplay();
    alert('🏆 Миссия выполнена! +2💪 +1🔄 +0.5⚡ и 100 XP!');
    
    resetDay();
  } else {
    if (confirm('Квест не выполнен! Сбросить прогресс за день?')) {
      resetDay();
    }
  }
}

// Повышение уровня
function levelUp() {
  stats.level++;
  stats.xp -= stats.maxXp;
  stats.maxXp += 250;
  
  stats.targets.pushUps += 20;
  stats.targets.sitUps += 20;
  stats.targets.squats += 20;
  stats.targets.plank += 1;
  
  document.getElementById('sound-levelup').play();
  alert(`🎉 Уровень UP! Теперь ты ${stats.level} уровня! Цели увеличены!`);
  
  const levelElement = document.getElementById('level');
  if (levelElement) levelElement.classList.add('level-up');
  setTimeout(() => {
    if (levelElement) levelElement.classList.remove('level-up');
  }, 3000);
}

// Сброс дня
function resetDay() {
  stats.pushUps = 0;
  stats.sitUps = 0;
  stats.squats = 0;
  stats.running = 0;
  stats.plank = 0;
  updateDisplay();
}

// Обновление интерфейса
function updateDisplay() {
  // Упражнения
  document.getElementById('push-ups').textContent = stats.pushUps;
  document.getElementById('push-ups-target').textContent = stats.targets.pushUps;
  document.getElementById('push-ups-bar').style.width = `${(stats.pushUps / stats.targets.pushUps) * 100}%`;
  
  document.getElementById('sit-ups').textContent = stats.sitUps;
  document.getElementById('sit-ups-target').textContent = stats.targets.sitUps;
  document.getElementById('sit-ups-bar').style.width = `${(stats.sitUps / stats.targets.sitUps) * 100}%`;
  
  document.getElementById('squats').textContent = stats.squats;
  document.getElementById('squats-target').textContent = stats.targets.squats;
  document.getElementById('squats-bar').style.width = `${(stats.squats / stats.targets.squats) * 100}%`;
  
  document.getElementById('running').textContent = stats.running;
  document.getElementById('running-target').textContent = stats.targets.running;
  document.getElementById('running-bar').style.width = `${(stats.running / stats.targets.running) * 100}%`;
  
  document.getElementById('plank').textContent = stats.plank;
  document.getElementById('plank-target').textContent = stats.targets.plank;
  document.getElementById('plank-bar').style.width = `${(stats.plank / stats.targets.plank) * 100}%`;
  
  // Статистика
  const levelElements = ['level', 'level-main', 'level-ach'];
  const xpElements = ['xp', 'xp-main'];
  const maxXpElements = ['maxXp', 'maxXp-main'];
  const streakElements = ['streak', 'streak-main'];
  
  levelElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = stats.level;
  });
  
  xpElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = stats.xp;
  });
  
  maxXpElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = stats.maxXp;
  });
  
  streakElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = stats.streak;
  });
  
  document.getElementById('total-xp').textContent = stats.totalXp;
  document.getElementById('max-streak').textContent = stats.maxStreak;
  
  // Общая статистика
  document.getElementById('total-pushups').textContent = stats.totals.pushUps;
  document.getElementById('total-situps').textContent = stats.totals.sitUps;
  document.getElementById('total-squats').textContent = stats.totals.squats;
  document.getElementById('total-running').textContent = stats.totals.running;
  document.getElementById('total-plank').textContent = stats.totals.plank;
  document.getElementById('total-workouts').textContent = stats.totals.workouts;
  
  // Средние значения
  const avgPushups = stats.totals.workouts > 0 ? Math.round(stats.totals.pushUps / stats.totals.workouts) : 0;
  const avgSquats = stats.totals.workouts > 0 ? Math.round(stats.totals.squats / stats.totals.workouts) : 0;
  
  document.getElementById('avg-pushups').textContent = avgPushups;
  document.getElementById('avg-squats').textContent = avgSquats;
  
  // Рекорды
  document.getElementById('max-pushups').textContent = stats.records.pushUps;
  document.getElementById('max-squats').textContent = stats.records.squats;
  document.getElementById('max-running').textContent = stats.records.running;
  document.getElementById('max-plank').textContent = stats.records.plank;
  
  // Характеристики
  document.getElementById('strength-stat').textContent = stats.attributes.strength.toFixed(1);
  document.getElementById('stamina-stat').textContent = stats.attributes.stamina.toFixed(1);
  document.getElementById('speed-stat').textContent = stats.attributes.speed.toFixed(1);
  document.getElementById('strength-main').textContent = stats.attributes.strength.toFixed(1);
  document.getElementById('stamina-main').textContent = stats.attributes.stamina.toFixed(1);
  document.getElementById('speed-main').textContent = stats.attributes.speed.toFixed(1);
  
  // Кнопка завершения
  const completeBtn = document.getElementById('complete-btn');
  const allCompleted = stats.pushUps >= stats.targets.pushUps &&
                     stats.sitUps >= stats.targets.sitUps &&
                     stats.squats >= stats.targets.squats &&
                     stats.running >= stats.targets.running &&
                     stats.plank >= stats.targets.plank;
  
  if (allCompleted) {
    completeBtn.textContent = "🏁 Завершить квест";
    completeBtn.classList.add('complete-btn');
  } else {
    completeBtn.textContent = "♻️ Сбросить день";
    completeBtn.classList.remove('complete-btn');
  }
  
  saveStats();
}

// Напоминание
function checkNotification() {
  const now = new Date();
  const hours = now.getHours();
  if (hours >= 18 && !localStorage.getItem('notifiedToday')) {
    if (Notification.permission === 'granted') {
      new Notification('⚡ Внимание, оперативник!', {
        body: 'Твоя миссия ждёт! Выполни все задания для повышения уровня!',
        icon: 'https://static.tildacdn.com/tild3264-6531-4236-a438-383933623632/hud-ui-gui-futuristi.jpg'
      });
    }
    localStorage.setItem('notifiedToday', 'true');
  }
}

// Показ уведомления
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Иконки для типов характеристик
function getTypeIcon(type) {
  return {
    strength: '💪',
    stamina: '🔄', 
    speed: '⚡'
  }[type] || '🎯';
}

// Инициализация
window.onload = function() {
  initGame();
  
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  setTimeout(() => {
    localStorage.removeItem('notifiedToday');
  }, midnight - now);
  
  setInterval(checkNotification, 600000);
  openTab('main');
};