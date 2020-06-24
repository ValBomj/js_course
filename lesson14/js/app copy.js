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




