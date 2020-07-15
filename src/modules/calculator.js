const calculator = (price = 100) => {
  const calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcDay = document.querySelector(".calc-day"),
    calcCount = document.querySelector(".calc-count"),
    totalValue = document.getElementById("total");

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1,
      timeout,
      counter = 0;
    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    const animation = total => {
      counter += 10;
      totalValue.textContent = counter;
      if (counter < total) {
        timeout = requestAnimationFrame(() => {
          animation(total);
        });
      } else {
        cancelAnimationFrame(timeout);
      }
    };
    animation(total);
  };

  calcBlock.addEventListener("input", e => {
    const target = e.target;
    if (target.closest("input")) {
      const value = target.value;
      target.value = value.replace(/\D/g, "");
    }
  });

  calcBlock.addEventListener("change", e => {
    const target = e.target;
    if (target.matches("input") || target.matches("select")) {
      countSum();
    }
  });
};

export default calculator;
