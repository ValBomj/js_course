"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function () {
  do {
    // Спрашиваю у пользователя "Ваш месячный доход?"
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    // Спрашиваю у пользователя "Перечислите возможные расходы за рассчитываемый период через запятую"
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    // Привожу возможные расходы 
    appData.addExpenses = addExpenses.toLowerCase().split(", ");

    // Спрашиваю у пользователя "Есть ли у вас депозит в банке?"
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let question = prompt("Введите обязательную статью расходов?");
      appData.expenses[question] = prompt("Во сколько это обойдется?");
    }
  },

  // Вычисляем сумму всех обязательных доходов за месяц
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }

    return appData.expensesMonth;
  },

  // Вычисляем бюджет на месяц и на день
  getBudget: function () {
    // return money - expensesAmount;
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  // Вычисляем срок достижения цели (в месяцах)
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },

  // Вычисляем уровень дохода
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// Выводим расходы за месяц
console.log(appData.expenses);

// Выводим срок достижения цели
if (appData.getTargetMonth() > 0) {
  console.log(
    "Цель будет достигнута за: " +
      Math.ceil(appData.getTargetMonth()) +
      " месяцев"
  );
} else {
  console.log("Цель не будет достигнута");
}

// Выводим уровень дохода
console.log(appData.getStatusIncome());
