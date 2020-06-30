'use strict';
function getResult(x,y){
  let result;
  
  const pow = (Math.pow(x,y) + '').split('');

  const powToNum = pow.map((item) => +item)
  
  result = powToNum.reduce((acc, item) => acc + item);

  return result
}

console.log(getResult(7, 10))