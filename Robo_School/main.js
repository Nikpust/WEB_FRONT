const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');
const trainersContainer = document.querySelector('.section-three-carousel');
const scrollbarThumb = document.getElementById('scrollbarThumb');
const customScrollbar = document.getElementById('customScrollbar');

const scrollStep = 260; 

function updateScrollbar() {
    const scrollWidth = trainersContainer.scrollWidth;
    const clientWidth = trainersContainer.clientWidth;
    const thumbWidth = (clientWidth / scrollWidth) * customScrollbar.clientWidth;
    
    scrollbarThumb.style.width = `${thumbWidth}px`;
    scrollbarThumb.style.transform = `translateX(${(trainersContainer.scrollLeft / (scrollWidth - clientWidth)) * (customScrollbar.clientWidth - thumbWidth)}px)`;
}

nextBtn.addEventListener('click', () => {
    trainersContainer.scrollBy({ left: scrollStep, behavior: 'smooth' });
    updateScrollbar();
});

prevBtn.addEventListener('click', () => {
    trainersContainer.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    updateScrollbar();
});

trainersContainer.addEventListener('scroll', updateScrollbar);

window.addEventListener('resize', updateScrollbar);

let isTouching = false;
let startX;

trainersContainer.addEventListener('touchstart', (e) => {
    isTouching = true;
    startX = e.touches[0].clientX;
});

trainersContainer.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    const x = e.touches[0].clientX;
    const walk = startX - x;
    trainersContainer.scrollLeft += walk;
    startX = x;
});

trainersContainer.addEventListener('touchend', () => {
    isTouching = false;
});

let isDragging = false;
let startScrollLeft;

scrollbarThumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = trainersContainer.scrollLeft;
    document.body.style.userSelect = 'none'; 
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const maxScrollLeft = trainersContainer.scrollWidth - trainersContainer.clientWidth;
    const maxThumbPosition = customScrollbar.clientWidth - scrollbarThumb.clientWidth;
    const scrollOffset = (deltaX / maxThumbPosition) * maxScrollLeft;
    
    trainersContainer.scrollLeft = startScrollLeft + scrollOffset;
    updateScrollbar();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
});

updateScrollbar();

function scroll_bar() {
    const body = document.body;
    if (document.getElementById("window-menu").checked || document.getElementById("modal-window-irina").checked || document.getElementById("modal-window-marina").checked || document.getElementById("modal-window-maksim").checked || document.getElementById("modal-window-konstantin").checked || document.getElementById("modal-window-liza").checked || document.getElementById("window-menu").checked) {
        body.classList.add("no-scroll");
    } else {
        body.classList.remove("no-scroll");
    }
}

function closeMenu() {
    document.getElementById("window-menu").checked = false;
    document.body.classList.remove("no-scroll");
}


document.querySelectorAll('.dropdown-content p').forEach(item => {
    item.onclick = () => {
      const dropdownButton = item.closest('.dropdown').querySelector('.dropdown_button');
      dropdownButton.innerHTML = `<p>${item.textContent}</p> <img src="Pictures/drop-dawn-arrow.svg" alt="" class="arrow">`;
    };
});