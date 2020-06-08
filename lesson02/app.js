const money = 15000;
const income = 'Freelance';
const addExpenses = 'Internet, taxi, communal payments';
const deposit = true;
const mission = 100000;
const period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);