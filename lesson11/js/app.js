const start = document.getElementById("start");
const incomePlus = document.getElementsByTagName("button")[0];
const expensesPlus = document.getElementsByTagName("button")[1];
const checkbox = document.querySelector("#deposit-check");
const additionalIncomeItem = document.querySelectorAll(".additional_income-item");
const budgetMonthValue = document.querySelector(".budget_month-value");
const budgetDayValue = document.querySelector(".budget_day-value");
const expensesMonthValue = document.querySelector(".expenses_month-value");
const additionalIncomeValue = document.querySelector(".additional_income-value");
const additionalExpensesValue = document.querySelector(".additional_expenses-value");
const incomePeriodValue = document.querySelector(".income_period-value");
const targetMonthValue = document.querySelector(".target_month-value");
const salaryAmount = document.querySelector(".salary-amount");
const incTitle = document.querySelector("input.income-title");
const incAmount = document.querySelector(".income-amount");
const expTitle = document.querySelector("input.expenses-title");
const expAmount = document.querySelector(".expenses-amount");
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector(".additional_expenses-item");
const targetAmount = document.querySelector(".target-amount");
const periodSelect = document.querySelector(".period-select");
let incomeItems = document.querySelectorAll('.income-items');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


const appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.persentDeposit = 0;
    appData.moneyDeposit = 0;
    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function() {
    
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();

    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  addExpensesBlock: function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    })
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    })
    for (const key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },
  asking: function () {

    // Привожу возможные расходы к нижнему регистру и вношу в масив
    if (addExpenses) {
      appData.addExpenses = addExpenses.toLowerCase().split(", ");
    }

    // Спрашиваю у пользователя "Есть ли у вас депозит в банке?"
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    appData.getInfoDeposit();
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
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  // Вычисляем срок достижения цели (в месяцах)
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
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

salaryAmount.addEventListener('blur', function() {
  if(salaryAmount.value.trim().length > 0) { 
    start.disabled = false;
    start.addEventListener('click', appData.start);
  } else { 
    start.disabled = true;
    start.removeEventListener('click', appData.start);
  }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
  const periodAmount = document.querySelector('.period-amount');
  periodAmount.textContent = periodSelect.value;
});


/* // Выводим расходы за месяц
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
  console.log( "Наша программа включает в себя данные: Ключ: " + key + "; Значение: " + appData[key] + ";");
}

// Вывожу возможные расходы строкой. Каждое слово с большой буквы, через запятую и пробел
appData.addExpenses.forEach(function (item, i, array) {
  appData.addExpenses[i] = item[0].toUpperCase() + item.slice(1);
});
console.log(appData.addExpenses.join(", ")); */
