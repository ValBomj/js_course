const formValid = () => {
  const forms = document.querySelectorAll("form");
  forms.forEach(item => {
    if (
      item.tagName.toLocaleLowerCase() !== "button" &&
      item.type !== "button"
    ) {
      item.addEventListener("input", e => {
        const target = e.target;
        const value = target.value;
        if (target.name === "user_name" || target.name === "user_message") {
          target.value = value.replace(/[^а-яё ]/gi, "");
        } else if (target.name === "user_phone") {
          target.value = value.replace(/[^+0-9]/gi, "");
        }
      });
    }
  });
};

export default formValid;
