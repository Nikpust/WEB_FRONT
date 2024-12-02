// Реализация загрузки данных карточек из JSON-файла
let cards_data = [];
let displayed_cards = [];

// Загрузка данных из JSON
function Load_Data() {
    fetch('cards_data.json')
        .then(response => response.json())
        .then(data => {
            cards_data = data;
            displayed_cards = [...cards_data];
            
            document.getElementById("loader").classList.add("hidden");
            Display_Cards(cards_data);
            Select_News('Все новости');
        });
};

// Реализация выпадающего меню
function Toggle_Dropdown() {
    document.getElementById("dropdown-menu").classList.toggle("show");
};

window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
        document.getElementById("dropdown-menu").classList.remove("show");
    }
};

function Select_Option(option) {
    document.getElementById("selected-option").innerText = option;
    Sort_Cards(option);
    Toggle_Dropdown();
}

// Получение текущей даты
const today = new Date().toLocaleDateString('ru-RU');

// Отображение карточек
function Display_Cards(cards) {
    displayed_cards = cards;

    const container = document.getElementById("cards-container");
    container.innerHTML = '';

    cards.forEach(card => {
        const article = document.createElement("article");

        const header = document.createElement("div");
        header.classList.add("card-header");

        const type_element = document.createElement("p");
        type_element.classList.add("type-news");
        type_element.innerText = card.type;

        const date_element = document.createElement("p");
        date_element.classList.add("date-news");
        if (today === "26.11.2024") {
            date_element.innerText = `сегодня в ${card.date}`;
        } else {
            date_element.innerText = `${today} ${card.date}`;
        }

        header.appendChild(type_element);
        header.appendChild(date_element);
        article.appendChild(header);

        const picture = document.createElement("div");
        picture.classList.add("picture");

        const img_element = document.createElement("img");
        img_element.src = card.image;
        img_element.alt = "picture";

        picture.appendChild(img_element);
        article.appendChild(picture);

        const title = document.createElement("div");
        title.classList.add("title-news");

        const title_element = document.createElement("p");
        title_element.classList.add("text-title-news");
        title_element.innerText = card.title;

        title.appendChild(title_element);
        article.appendChild(title);

        const description = document.createElement("div");
        description.classList.add("description-news");

        const description_element = document.createElement("p");
        description_element.classList.add("text-description-news");
        description_element.innerText = card.description;

        description.appendChild(description_element);
        article.appendChild(description);

        container.appendChild(article);
    });
}

// Сортировка карточек по дате
function Sort_Cards(option) {
    const date = today.split('.').reverse().join('-');
    let sorted_cards = [...displayed_cards];

    if (option === 'Сначала новые') {
        sorted_cards.sort((a, b) => new Date(`${date}T${b.date}`) - new Date(`${date}T${a.date}`));
    } else if (option === 'Сначала старые') {
        sorted_cards.sort((a, b) => new Date(`${date}T${a.date}`) - new Date(`${date}T${b.date}`));
    } else { // При сортировке "По умолчанию" необхдимо сохранить исходное положение карточек, поэтому вводим новый массив для хранения и производим сранение
        let default_cards = [];
        for (let i = 0; i < cards_data.length; i++) {
            for (let j = 0; j < displayed_cards.length; j++) {
                if (cards_data[i] === displayed_cards[j]) {
                    default_cards.push(cards_data[i]);
                }
            }
        }
        Display_Cards(default_cards);
        return;
    }

    Display_Cards(sorted_cards);
}

// Фильтрация карточек по категориям
function Select_News(type) {
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.innerText === type) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (type === 'Все новости') {
        Display_Cards(cards_data);
    } else {
        let sorted_cards = [];
        cards_data.forEach(card => {
            if (card.type === type) {
                sorted_cards.push(card);
            }
        });
        Display_Cards(sorted_cards);
    }

    Select_Option("По умолчанию");
}

// Загрузка данных при старте
window.onload = Load_Data;
