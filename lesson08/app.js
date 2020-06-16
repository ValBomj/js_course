"use strict";

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function () {
  do {
    // Спрашиваю у пользователя "Ваш месячный доход?"
    money = prompt("Ваш месячный доход?", 50000);
  } while (!isNumber(money));
};
start();

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome;
      let cashIncome;
      do {
        itemIncome = prompt(
          "Какой у вас есть дополнительный заработок?",
          "Автомастерская"
        );
      } while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === "");
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Кино, театр"
    );
    // Спрашиваю у пользователя "Перечислите возможные расходы за рассчитываемый период через запятую"

    // Привожу возможные расходы к нижнему регистру и вношу в масив
    appData.addExpenses = addExpenses.toLowerCase().split(", ");

    // Спрашиваю у пользователя "Есть ли у вас депозит в банке?"
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    appData.getInfoDeposit();

    // Спашиваю у пользователя о его обязатеных статьях расходов и во сколько это обойдётся
    for (let i = 0; i < 2; i++) {
      let question;
      do {
        question = prompt("Введите обязательную статью расходов?");
      } while (isNumber(question) || question === null || question.trim() === "");
      do {
        appData.expenses[question] = prompt("Во сколько это обойдется?");
      } while (!isNumber(appData.expenses[question]));
    }
  },

  // Вычисляем сумму всех обязательных доходов за месяц
  getExpensesMonth: function () {
    for (const key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  // Вычисляем бюджет на месяц и на день
  getBudget: function () {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.persentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(appData.persentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
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

for (const key in appData) {
  console.log(
    "Наша программа включает в себя данные: Ключ: " +
      key +
      "; Значение: " +
      appData[key] +
      ";"
  );
}

// Вывожу возможные расходы строкой. Каждое слово с большой буквы, через запятую и пробел
appData.addExpenses.forEach(function(item, i, array) {
  appData.addExpenses[i] = item[0].toUpperCase() + item.slice(1);
});
console.log(appData.addExpenses.join(', '));