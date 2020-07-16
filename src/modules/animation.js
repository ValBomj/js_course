const animation = () => {
  let menuInter;
  const scrollAnimation = divTop => {
    const top = 50;
    if (document.documentElement.scrollTop < divTop) {
      document.documentElement.scrollTop += top;
      if (
        document.documentElement.scrollTop <
        document.body.scrollHeight - window.innerHeight
      ) {
        menuInter = requestAnimationFrame(() => {
          scrollAnimation(divTop);
        });
      }
    } else {
      cancelAnimationFrame(menuInter);
    }
  };

  document.addEventListener("click", e => {
    if (!e.target.closest('a')) return;
    const target = e.target.closest('a');
    if (
      target.getAttribute("href").slice(0, 1) === "#" &&
      target.getAttribute("href").slice(1).length > 0 &&
      target.getAttribute("href").slice(1) !== "close"
    ) {
      const div = document.querySelector(`${target.closest('a').getAttribute("href")}`).offsetTop;
      e.preventDefault();
      scrollAnimation(div);
    }
  });
};

export default animation;
