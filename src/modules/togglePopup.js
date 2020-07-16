let top = -100;
let popupInterval;
const popup = document.querySelector(".popup"),
  popupAnimation = () => {
    popup.style.display = "block";
    const popupContent = document.querySelector(".popup-content");
    popupContent.style.top = `${top}%`;

    top += 5;
    if (top <= 10) {
      popupInterval = requestAnimationFrame(popupAnimation);
    } else {
      cancelAnimationFrame(popupInterval);
    }
  };
const togglePopup = () => {
  popup.addEventListener("click", e => {
    let target = e.target;

    if (target.classList.contains("popup-close")) {
      popup.style.display = "none";
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        popup.style.display = "none";
      }
    }
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".popup-btn")) return;
    if (document.documentElement.clientWidth >= 768) {
      top = -100;
      popupAnimation();
    } else {
      popup.style.display = "block";
    }
  });
};

export default togglePopup;
