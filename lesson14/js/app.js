'use strict';

const start = document.getElementById("start");
const cancel = document.getElementById("cancel");
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

const data = document.querySelector('.data');
const placeholderInput = data.querySelectorAll('input');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const inputValidation = function() {
  const placeholderInput = data.querySelectorAll('input');
  placeholderInput.forEach(function(item) {
    if (item.placeholder === 'Сумма') {
      item.addEventListener('keyup', function(e) {

        const itemValueArr = item.value.split('');
        itemValueArr.forEach(function(letter, i, array) {
          if (letter.match(/[^0-9]/)) {
            delete array[i];
            item.value = array.join('');
          }
        });
      })
    }
    if (item.placeholder === 'Наименование' || item.placeholder === 'название') {
      item.addEventListener('keyup', function(e) {

        const itemValueArr = item.value.split('');
        itemValueArr.forEach(function(letter, i, array) {
          if (letter.match(/[^А-Яа-яЁё,.!?;: ]/)) {
            delete array[i];
            item.value = array.join('');
          }
        });
      })
    }
  })
}
inputValidation();

const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0; 
  this.deposit = false;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.addExpenses = [];
}

AppData.prototype.inputBlock = function() {
  const placeholderInput = data.querySelectorAll('input');
  placeholderInput.forEach(function(item) {
      item.disabled = !item.disabled;
  });
  incomePlus.disabled = ! incomePlus.disabled;
  expensesPlus.disabled = ! expensesPlus.disabled;
  
};
AppData.prototype.inputReset = function() {
  const placeholderInput = data.querySelectorAll('input');
  placeholderInput.forEach(function(item) {
    item.value = '';
    if (item.type === 'range') {
      item.value = 1;
      const periodAmount = document.querySelector('.period-amount');
      periodAmount.textContent = '1';
    }
  });
};
AppData.prototype.reset = function() {
  const expensesItems = document.querySelectorAll('.expenses-items');
  const incomeItems = document.querySelectorAll('.income-items');

  expensesItems.forEach(function(item, i) {
    if (i > 0) {
      item.parentNode.removeChild(item);
    }
    expensesPlus.style.display = 'block';
  });
  incomeItems.forEach(function(item, i) {
    if (i > 0) {
      item.parentNode.removeChild(item);
    }
    incomePlus.style.display = 'block';
  });
  start.disabled = true;


  start.style.display = 'block';
  cancel.style.display = 'none';
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  budgetMonthValue.value = '';
  budgetDayValue.value = '';
  expensesMonthValue.value = '';
  additionalExpensesValue.value = '';
  additionalIncomeValue.value = '';
  targetMonthValue.value = '';
  incomePeriodValue.value = '';
};
AppData.prototype.start = function () {
  this.inputBlock();
  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();
  start.style.display = 'none';
  cancel.style.display = 'block';
};
AppData.prototype.showResult = function() {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();

  periodSelect.addEventListener('input', function() {
    incomePeriodValue.value = this.calcPeriod().bind(this);
  }.bind(this));
};
AppData.prototype.addExpensesBlock = function() {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  const inputs = cloneExpensesItem.querySelectorAll('input');
  inputs.forEach(function(item) {
    item.value = '';
  })
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  inputValidation();  
  expensesItems = document.querySelectorAll('.expenses-items');

  
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function() {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  const inputs = cloneIncomeItem.querySelectorAll('input');
  inputs.forEach(function(item) {
    item.value = '';
  })
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  inputValidation();  
  incomeItems = document.querySelectorAll('.income-items');
  
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function() {
  expensesItems.forEach(function(item) {
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }.bind(this))
};
AppData.prototype.getIncome = function() {
  incomeItems.forEach(function(item) {
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  }.bind(this))
  for (const key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function() {
  const addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }.bind(this))
};
AppData.prototype.getAddIncome = function() {
  additionalIncomeItem.forEach(function(item) {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }.bind(this))
};
// Вычисляем сумму всех обязательных доходов за месяц
AppData.prototype.getExpensesMonth = function () {
  for (const key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return this.expensesMonth;
};
// Вычисляем бюджет на месяц и на день
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
// Вычисляем срок достижения цели (в месяцах)
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * this.period;
};

AppData.prototype.eventListeners = function() {
  start.disabled = true;
  salaryAmount.addEventListener('blur', function() {
    if(salaryAmount.value.trim().length > 0) { 
      start.disabled = false;
    } 
  }.bind(this));
  start.addEventListener('click', this.start.bind(this));

  
  cancel.addEventListener('click', function() {
    this.inputReset();
    this.inputBlock();
    this.reset();
  }.bind(this));
  
  
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
  periodSelect.addEventListener('input', function() {
    const periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
  });
}

const appData = new AppData();
appData.eventListeners();
appData.reset();




