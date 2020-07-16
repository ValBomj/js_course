const ourTeam = () => {
  const command = document.getElementById("command");

  let src, dataSrc;
  command.addEventListener('mouseover', e => {
    if (!e.target.closest('img.command__photo')) return;
    const target = e.target;
    src = target.src;
    dataSrc = target.dataset.img;
    target.src = dataSrc;
  });

  command.addEventListener('mouseout', e => {
    if (!e.target.closest('img.command__photo')) return;
    const target = e.target;
    target.src = src;
  });
};

export default ourTeam;
