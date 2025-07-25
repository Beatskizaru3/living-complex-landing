const scrollBar = document.querySelector('.advant__scroll-wrapper');
let isDown = false;
let startX;
let scrollLeft;

scrollBar.addEventListener('mousedown', (e) => {
    isDown = true;
    console.log('mousedown');
    scrollBar.classList.add('active');

    // Получаем позицию контейнера относительно окна
    const rect = scrollBar.getBoundingClientRect();

    // Координата мыши относительно левого края контейнера
    startX = e.pageX - rect.left;

    // Текущая прокрутка контейнера по горизонтали
    scrollLeft = scrollBar.scrollLeft;
});

scrollBar.addEventListener('mouseleave', () => {
    isDown = false;
    scrollBar.classList.remove('active');
});

scrollBar.addEventListener('mouseup', () => {
    isDown = false;
    scrollBar.classList.remove('active');
});

scrollBar.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    e.preventDefault();

    const rect = scrollBar.getBoundingClientRect();
    const x = e.pageX - rect.left;

    const walk = (x - startX) * 1.5;
    console.log('walk:', walk);

    scrollBar.scrollLeft = scrollLeft - walk;
});
