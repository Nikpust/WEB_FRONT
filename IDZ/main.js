function load_data(){
    setTimeout(() => {
        document.getElementById("loader").classList.add("cook-hidden");
    }, 1000);
    fetch('bank.json').then(response => response.json()).then(data => {bin_card = data});
}

function toggle_dropdown(event) {
    event.preventDefault();
    document.getElementById("dropdown-menu").classList.toggle("show");
}

function select_option(option) {
    document.getElementById("selected-option").innerText = option;

    const cost_btn = document.getElementById("cost");
    switch(option) {
        case "Базовый":
            cost_btn.innerText = "Оплатить: 100$";
            break;
        case "Средний":
            cost_btn.innerText = "Оплатить: 200$";
            break;
        case "Премиум":
            cost_btn.innerText = "Оплатить: 300$";
            break;
    }

    toggle_dropdown(event);
};

window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
        document.getElementById("dropdown-menu").classList.remove("show");
    }
};

function hidden_modal_off() {
    document.getElementById("modal").classList.add("hidden");
};

function hidden_modal_on() {
    document.getElementById("modal").classList.remove("hidden");
};

document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const numner_card = document.getElementById("form-nnumbercard").value;
    const date = document.getElementById("date").value;
    const code = document.getElementById("code").value;
    console.log(`Данные карточки:\nНомер: ${numner_card}\nСрок действия: ${date}\nКод: ${code}\nПереданы третьим лицам!`);
});

document.getElementById("form-nnumbercard").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value.replace(/(\d{4})/g, "$1 ").trim();

    const modalWindow = document.querySelector(".modal-window");
    const bankNameElement = document.getElementById("bank-name");

    if (value.length >= 6) {
        const bankInfo = bin_card[value.slice(0, 6)];
        if (bankInfo) {
            bankNameElement.textContent = `Банк: ${bankInfo.name}`;
            modalWindow.style.backgroundColor = bankInfo.backgroundColor;
            bankNameElement.style.color = bankInfo.textColor;
        } else {
            bankNameElement.textContent = "Банк: неизвестный банк";
            modalWindow.style.backgroundColor = "#FFFFFF";
            bankNameElement.style.color = "#141024";
        }
    } else {
        bankNameElement.textContent = "Банк: не определен";
        modalWindow.style.backgroundColor = "#FFFFFF";
        bankNameElement.style.color = "#141024";
    }
});

document.getElementById("date").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    e.target.value = value;
});

document.getElementById("code").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    e.target.value = value;
});