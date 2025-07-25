document.addEventListener('DOMContentLoaded', () => {
  const sliderInner = document.querySelector('.slider__inner');
  let sliderItems = Array.from(document.querySelectorAll('.slider__inner-item'));
  const numClones = 2;

  // запрет нативного drag’n’drop и выделения в слайде
  sliderInner.addEventListener('dragstart', e => e.preventDefault());
  sliderInner.style.userSelect = 'none';

  // 1. Клонирование
  if (sliderItems.length) {
    for (let i = 0; i < numClones; i++) {
      sliderInner.prepend(sliderItems[sliderItems.length - 1 - i].cloneNode(true));
      sliderInner.append(sliderItems[i].cloneNode(true));
    }
  } else {
    console.warn('Нет слайдов для инициализации');
    return;
  }

  // 2. Инициализация
  sliderItems = Array.from(document.querySelectorAll('.slider__inner-item'));
  let currentIndex = numClones;
  const sliderItemWidth = sliderItems[0].offsetWidth + 20;
  let isDragging = false, startX = 0, prevTranslate = 0, currentTranslate = 0;

  function setPosition() {
    sliderInner.style.transform = `translateX(${-currentIndex * sliderItemWidth}px)`;
  }
  function updateActive() {
    sliderItems.forEach((it, i) => {
      it.classList.toggle('active', i === currentIndex);
    });
  }
  setPosition();
  updateActive();

  // 3. «Прыжок» без глитча
  function checkLoop() {
    sliderInner.style.transition = 'none';
    sliderInner.classList.add('no-item-transition');

    if (currentIndex >= sliderItems.length - numClones) {
      currentIndex = numClones;
    } else if (currentIndex < numClones) {
      currentIndex = sliderItems.length - numClones - 1;
    }
    setPosition();

    requestAnimationFrame(() => {
      updateActive();
      requestAnimationFrame(() => {
        sliderInner.style.transition = 'transform 0.3s ease-out';
        sliderInner.classList.remove('no-item-transition');
      });
    });
  }

  // 4. Свайп
  function getX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
  function startDrag(e) {
    e.preventDefault(); // блокируем выделение текста
    isDragging = true;
    startX = getX(e);
    prevTranslate = -currentIndex * sliderItemWidth;
    sliderInner.style.transition = 'none';

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  }
  function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    const diff = getX(e) - startX;
    currentTranslate = prevTranslate + diff;
    sliderInner.style.transform = `translateX(${currentTranslate}px)`;
  }
  function endDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);

    sliderInner.style.transition = 'transform 0.3s ease-out';
    const moved = currentTranslate - prevTranslate;
    const threshold = sliderItemWidth / 4;
    if (moved < -threshold) currentIndex++;
    else if (moved > threshold) currentIndex--;

    setPosition();
    updateActive();
    setTimeout(checkLoop, 350);
  }

  sliderInner.addEventListener('mousedown', startDrag);
  sliderInner.addEventListener('touchstart', startDrag, { passive: false });
});
