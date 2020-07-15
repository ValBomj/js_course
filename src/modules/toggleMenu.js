const toggleMenu = () => {
  const menu = document.querySelector("menu"),
    body = document.querySelector("body");

  const handlerMenu = () => {
    menu.classList.toggle("active-menu");
  };

  body.addEventListener("click", e => {
    const target = e.target;
    if (target.closest(".menu")) {
      handlerMenu();
    } else if (target.closest(".close-btn")) {
      handlerMenu();
    } else if (
      menu.classList.contains("active-menu") &&
      target.tagName === "A"
    ) {
      handlerMenu();
    } else if (
      menu.classList.contains("active-menu") &&
      !target.closest("menu")
    ) {
      handlerMenu();
    }
  });
};

export default toggleMenu;
