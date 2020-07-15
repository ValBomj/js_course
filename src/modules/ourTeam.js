const ourTeam = () => {
  const command = document.getElementById("command");
  const addImgSrc = e => {
    const target = e.target;
    const src = target.src;
    if (target.closest("img.command__photo")) {
      target.src = target.dataset.img;
      const removeSrc = () => {
        target.src = src;
        command.removeEventListener("mouseout", removeSrc);
      };
      command.addEventListener("mouseout", removeSrc);
    }
  };
  command.addEventListener("mouseover", addImgSrc);
};

export default ourTeam;
