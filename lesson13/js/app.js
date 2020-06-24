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
let placeholderInput = data.querySelectorAll('input');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const inputValidation = function() {
  let placeholderInput = data.querySelectorAll('input');
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
  inputBlock: function() {
    let placeholderInput = data.querySelectorAll('input');
    placeholderInput.forEach(function(item) {
      if (item.type === 'text') {
        item.disabled = !item.disabled;
      }
    });
  },
  inputReset: function() {
    let placeholderInput = data.querySelectorAll('input');
    placeholderInput.forEach(function(item) {
      item.value = '';
      if (item.type === 'range') {
        item.value = 1;
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = '1';
      }
    });
  },
  reset: function() {
    cancel.addEventListener('click', function() {

      appData.inputReset();

      boundReset();
    });
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

    start.style.display = 'block';
    cancel.style.display = 'none';
    this.inputBlock();
  },
  start: function () {
    this.reset();
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
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = this.calcPeriod();
    }.bind(appData));
  },
  addExpensesBlock: function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const inputs = cloneExpensesItem.querySelectorAll('input');
    inputs.forEach(function(item) {
      item.value = '';
    })
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    inputValidation();  
    expensesItems = document.querySelectorAll('.expenses-items');

    start.addEventListener('click', appData.inputBlock);
    
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
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
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, appData)
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    }, appData)
    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, appData)
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, appData)
  },

  // Вычисляем сумму всех обязательных доходов за месяц
  getExpensesMonth: function () {
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  },

  // Вычисляем бюджет на месяц и на день
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  // Вычисляем срок достижения цели (в месяцах)
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },
  calcSavedMoney: function () {
    return this.budgetMonth * this.period;
  },
};


salaryAmount.addEventListener('blur', function() {
  if(salaryAmount.value.trim().length > 0) { 
    start.disabled = false;
    start.addEventListener('click', boundStart);
  } else { 
    start.disabled = true;
    start.removeEventListener('click', boundStart);
  }
});

const boundAddExpBlock = appData.addExpensesBlock.bind(appData);
const boundAddIncBlock = appData.addIncomeBlock.bind(appData);
const boundStart = appData.start.bind(appData);
const boundReset = appData.reset.bind(appData);

expensesPlus.addEventListener('click', boundAddExpBlock);
incomePlus.addEventListener('click', boundAddIncBlock);
periodSelect.addEventListener('input', function() {
  const periodAmount = document.querySelector('.period-amount');
  periodAmount.textContent = periodSelect.value;
});




