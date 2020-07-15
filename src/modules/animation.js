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

  const a = document.querySelectorAll("a");
  a.forEach(item => {
    if (
      item.getAttribute("href").slice(0, 1) === "#" &&
      item.getAttribute("href").slice(1).length > 0 &&
      item.getAttribute("href").slice(1) !== "close"
    ) {
      const div = document.querySelector(`${item.getAttribute("href")}`)
        .offsetTop;
      item.addEventListener("click", e => {
        e.preventDefault();
        scrollAnimation(div);
      });
    }
  });
};

export default animation;
