'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const additionalIncomeItem = document.querySelectorAll(
  '.additional_income-item'
);
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector(
  '.additional_income-value'
);
const additionalExpensesValue = document.querySelector(
  '.additional_expenses-value'
);
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incTitle = document.querySelector('input.income-title');
const incAmount = document.querySelector('.income-amount');
const expTitle = document.querySelector('input.expenses-title');
const expAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector(
  '.additional_expenses-item'
);
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');

const data = document.querySelector('.data');
const placeholderInput = data.querySelectorAll('input');

const inputValidation = () => {
  const placeholderInput = data.querySelectorAll('input');
  placeholderInput.forEach((item) => {
    if (item.placeholder === 'Сумма' || item.placeholder === 'Процент') {
      item.addEventListener('keyup', function (e) {
        const itemValueArr = item.value.split('');
        itemValueArr.forEach((letter, i, array) => {
          if (letter.match(/[^0-9]/)) {
            delete array[i];
            item.value = array.join('');
          }
        });
      });
    }
    if (
      item.placeholder === 'Наименование' ||
      item.placeholder === 'название'
    ) {
      item.addEventListener('keyup', (e) => {
        const itemValueArr = item.value.split('');
        itemValueArr.forEach((letter, i, array) => {
          if (letter.match(/[^А-Яа-яЁё,.!?;: ]/)) {
            delete array[i];
            item.value = array.join('');
          }
        });
      });
    }
  });
};
inputValidation();

class AppData {
  constructor() {
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

  inputBlock() {
    const placeholderInput = data.querySelectorAll('input');
    placeholderInput.forEach((item) => {
      if (item.type !== 'range') {
        item.disabled = !item.disabled;
      }
    });
    incomePlus.disabled = !incomePlus.disabled;
    expensesPlus.disabled = !expensesPlus.disabled;
    depositBank.disabled = !depositBank.disabled;
  };
  inputReset() {
    const placeholderInput = data.querySelectorAll('input');
    placeholderInput.forEach((item) => {
      item.value = '';
      if (item.type === 'range') {
        item.value = 1;
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = '1';
      }
    });
  };
  reset() {
    const expensesItems = document.querySelectorAll('.expenses-items');
    const incomeItems = document.querySelectorAll('.income-items');

    expensesItems.forEach((item, i) => {
      if (i > 0) {
        item.parentNode.removeChild(item);
      }
      expensesPlus.style.display = 'block';
    });
    incomeItems.forEach((item, i) => {
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
    this.percentDeposit = 0;
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

    checkbox.checked = false;
    this.depositHandler();
    this.changePercent();
  };
  start() {
    if ((checkbox.checked && depositAmount.value === '' || depositBank.selectedIndex === 0) || (checkbox.checked && depositBank.value === 'other' && depositPercent.value === '')) {
    checkbox.checked = false;
      this.depositHandler();
    }
    this.inputBlock();
    this.budget = +salaryAmount.value;

    this.getExpInc({isIncome: false, array: expensesItems, name: "expenses" });
    this.getExpInc({isIncome: false, array: incomeItems, name: "income" });
    this.getExpensesMonth();
    this.getAddExpInc({isExpenses: true, array: additionalExpensesItem, name: 'addExpenses'});
    this.getAddExpInc({name: 'addIncome', array: additionalIncomeItem});
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';

  };
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  };
  addExpIncBlock(e) {
    const button = e.target;
    const itemName = button.parentNode.className;
    let items = document.querySelectorAll(`.${itemName}-items`);
    const cloneItem = items[0].cloneNode(true);
    const inputs = cloneItem.querySelectorAll("input");
    inputs.forEach((item) => {
      item.value = "";
    });
    items[0].parentNode.insertBefore(cloneItem, button);
    inputValidation();
    let newItems = document.querySelectorAll(`.${itemName}-items`);

    if (newItems.length === 3) {
      button.style.display = "none";
    }
  }
  getExpInc({isIncome = false, array = [], name = "" }) {
    array.forEach((item) => {
      const title = item.querySelector(`.${name}-title`).value;
      const amount = item.querySelector(`.${name}-amount`).value;
      if (title !== '' && amount !== '') {
        this[name][title] = amount;
      }
    })
    if (isIncome) {
      for (const key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }
  };
  getAddExpInc({ isExpenses = false, array = [], name = "" }) {
    array = isExpenses ? array.value.split(",") : array;

    array.forEach((item) => {
      const itemValue = isExpenses ? item.trim() : item.value.trim();
      if (itemValue !== "") {
        this[name].push(itemValue);
      }
    });
  }
  // Вычисляем сумму всех обязательных доходов за месяц
  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  };
  // Вычисляем бюджет на месяц и на день
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    if (this.deposit) {
      const monthDeposit = +this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth += monthDeposit;
    }
    this.budgetMonth = Math.floor(this.budgetMonth);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  // Вычисляем срок достижения цели (в месяцах)
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  };
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  };
  calcSavedMoney() {
    return this.budgetMonth * this.period;
  };
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  };
  
  changePercent() {
    const valueSelect = this.value;
    const percentCheck = function() {
      if (depositPercent.value < 1 || depositPercent.value > 100 || depositPercent.value.trim() === '') {
        alert('Введите корректное значение в поле проценты!');
        depositPercent.value = 0;
        start.disabled = true;
      } else {
        start.disabled = salaryAmount.value.trim().length > 0 ? false : true;
      }
    };
    depositPercent.removeEventListener('input', percentCheck);
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('input', percentCheck);
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  };
  depositHandler() {
    if(checkbox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  };
  eventListeners() {
    start.disabled = true;
    salaryAmount.removeEventListener('input', function(){});
    salaryAmount.addEventListener('input', () => {
      start.disabled = salaryAmount.value.trim().length > 0 ? false : true;
    });
    start.addEventListener('click', this.start.bind(this));

    cancel.addEventListener('click', () => {
      this.inputReset();
      this.inputBlock();
      this.reset();
    });

    expensesPlus.addEventListener('click', this.addExpIncBlock.bind(this));
    incomePlus.addEventListener('click', this.addExpIncBlock.bind(this));
    periodSelect.addEventListener('input', () => {
      const periodAmount = document.querySelector('.period-amount');
      periodAmount.textContent = periodSelect.value;
    });
    checkbox.addEventListener('change', this.depositHandler.bind(this));
  };
}

const appData = new AppData();
appData.eventListeners();
appData.reset();
