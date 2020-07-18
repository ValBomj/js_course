const formValid = () => {
  document.addEventListener('input', e => {
    if (!e.target.closest('form')) return;
    const target = e.target;
    if (target.tagName.toLocaleLowerCase() !== "button" && target.type !== "button") {
      const value = target.value;
      if (target.name === "user_name" || target.name === "user_message") {
        target.value = value.replace(/[^а-яё ]/gi, "");
      } else if (target.name === "user_phone") {
        target.value = value.replace(/[^+0-9]/gi, "");
        target.value = target.value.length > 15 ? target.value.slice(0, 15) : target.value;
      } else if (target.name === "user_email") {
        target.value = value.replace(/[а-яё ]/gi, "");
      }
    }
  });
};

export default formValid;
