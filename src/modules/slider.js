const slider = () => {
  const portfolioDots = document.querySelector(".portfolio-dots"),
    slide = document.querySelectorAll(".portfolio-item");
  for (let i = 0; i < slide.length; i++) {
    portfolioDots
      .appendChild(document.createElement("li"))
      .classList.add("dot");
  }
  const dot = document.querySelectorAll(".dot"),
    slider = document.querySelector(".portfolio-content");

  let currentSlide = 0,
    interval;

  dot[currentSlide].classList.add("dot-active");

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoplaySlide = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };
  const startSlide = (time = 3000) => {
    interval = setInterval(autoplaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };
  slider.addEventListener("click", event => {
    event.preventDefault();
    const target = event.target;

    if (!target.matches(".portfolio-btn, .dot")) return;

    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");

    if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });
  slider.addEventListener("mouseover", event => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      stopSlide();
    }
  });
  slider.addEventListener("mouseout", event => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      startSlide(1000);
    }
  });
  startSlide(1000);
};

export default slider;
