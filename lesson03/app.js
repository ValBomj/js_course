const income = 'Freelance';

// Спрашиваю у пользователя "Ваш месячный доход?"
const money = prompt('Ваш месячный доход?');
// Спрашиваю у пользователя "Перечислите возможные расходы за рассчитываемый период через запятую"
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// Спрашиваю у пользователя "Есть ли у вас депозит в банке?"
const deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');

const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');

// Цель заработать
const mission = 1000000;
const period = 6;

// Тип money
console.log(typeof money);
// Тип income
console.log(typeof income);
// Тип deposit
console.log(typeof deposit);

// Длинна строки addExpenses
console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase().split(', '));

// Вычисляем бюджет на месяц
const budgetMonth = money - (amount1 + amount2);
console.log(budgetMonth);

// Вычисляем период времени за который будет достигнута цель mission
const time = mission / budgetMonth;
console.log('Цель будет достигнута за: ' + Math.ceil(time) + ' месяцев');


// Вычисляем бюджет на день исходя из бюджета на месяц
let budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}



