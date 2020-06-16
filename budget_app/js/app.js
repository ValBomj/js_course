const btn = document.getElementById('start');

const plusAddIncome = document.getElementsByTagName('button')[0];
const plusExpenses = document.getElementsByTagName('button')[1];

const checkbox = document.querySelector('#deposit-check');

const inputs = document.querySelectorAll('.additional_income-item');

const budgetMonth = document.querySelector('.budget_month-value');
const budgetDay = document.querySelector('.budget_day-value');
const expMonth = document.querySelector('.expenses_month-value');
const addIncome = document.querySelector('.additional_income-value');
const addExpenses = document.querySelector('.additional_expenses-value');
const incomePeriod = document.querySelector('.income_period-value');
const targetMonth = document.querySelector('.target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incTitle = document.querySelector('.income-title');
const incAmount = document.querySelector('.income-amount');
const addIncItem = document.querySelector('.additional_income-item')[0];
const addIncItem2 = document.querySelector('.additional_income-item')[1];
const expTitle = document.querySelector('.expenses-title');
const expAmount = document.querySelector('.expenses-amount');
const addExpItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');

const periodSelect = document.querySelector('.period-select');