"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
const income = "Фриланс";
// Спрашиваю у пользователя "Перечислите возможные расходы за рассчитываемый период через запятую"
const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
// Спрашиваю у пользователя "Есть ли у вас депозит в банке?"
const deposit = confirm("Есть ли у вас депозит в банке?");

/* const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?', 2500);

const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?', 2500); */

// Цель заработать
const mission = 1000000;
const period = 6;

let start = function () {
  do {
    // Спрашиваю у пользователя "Ваш месячный доход?"
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};

start();

const showTypeOf = function (data) {
  console.log(typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(addExpenses);

let expenses = [];

// Вычисляем сумму всех обязательных доходов за месяц
function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?");


    let currentSum;
    do {
      currentSum = prompt("Во сколько это обойдется?");
    }
    while(!isNumber(currentSum));
    sum += +currentSum;
    
  }

  return sum;
}
const expensesAmount = getExpensesMonth();

// Вычисляем бюджет на месяц
function getAccumulatedMonth() {
  return money - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth();

// Вычисляем срок достижения цели (в месяцах)
function getTargetMonth() {
  return mission / accumulatedMonth;
}

// Вычисляем бюджет на день
const budgetDay = Math.floor(accumulatedMonth / 30);

// Выводим расходы за месяц
console.log(expensesAmount);

// Выводим возможные расходы в виде масива
console.log(addExpenses.toLowerCase().split(", "));

// Выводим срок достижения цели
if (getTargetMonth() > 0) {
  console.log(
    "Цель будет достигнута за: " + Math.ceil(getTargetMonth()) + " месяцев"
  );
} else {
  console.log(
    "Цель не будет достигнута"
  );
}

// Выводим бюджет на день
console.log(budgetDay);

// Вычисляем уровень дохода
const getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else {
    return "Что то пошло не так";
  }
};
console.log(getStatusIncome());
