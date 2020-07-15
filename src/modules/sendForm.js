const sendForm = () => {
  const errorMessage = "Что-то пошло не так",
    loadMessage = `
    <div class="sk-wandering-cubes">
      <div class="sk-cube sk-cube-1"></div>
      <div class="sk-cube sk-cube-2"></div>
    </div>
    `,
    successMessage = "Спасибо! Мы скоро с вами свяжемся!",
    statusMessage = document.createElement("div");

  statusMessage.style.cssText = "font-size: 2rem; color: white;";
  document.addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;

    const fields = [...form.elements];
    let checkError = 1;
    fields.forEach(item => {
      checkError *= item.classList.contains("error") ? 0 : 1;
    });
    if (checkError) {
      form.appendChild(statusMessage);
      statusMessage.innerHTML = loadMessage;
      const formData = new FormData(form);
      const body = {};
      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error");
          }
          console.log(response);
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          console.error(error);
          statusMessage.textContent = errorMessage;
        })
        .finally(() => {
          setTimeout(() => (statusMessage.textContent = ""), 5000);
          [...form.elements].forEach(item => (item.value = ""));
        });
    }
  });

  const postData = body =>
    fetch("./server.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
};

export default sendForm;
