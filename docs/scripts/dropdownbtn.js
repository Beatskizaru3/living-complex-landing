document.querySelectorAll(".buy__info-select").forEach(select => {
  const current = select.querySelector(".buy__info-select--current");
  const list = select.querySelector(".buy__info-select-list");
  const items = select.querySelectorAll(".buy__info-select-item");

  current.addEventListener('click', () => {
    list.classList.toggle('hidden');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      current.textContent = item.textContent;
      list.classList.add('hidden');
    });
  });

  document.addEventListener('click', e => {
    if (!select.contains(e.target)) {
      list.classList.add('hidden');
    }
  });
});
