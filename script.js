let emoji = ['\u{1F984}', '\u{1F43C}', '\u{1F437}', '\u{1F981}', '\u{1F41E}', '\u{1F438}', '\u{1F984}', '\u{1F43C}', '\u{1F437}', '\u{1F981}', '\u{1F41E}', '\u{1F438}'];
//переименовал rotate, т.к. не очевидное обозначение
const rotate = document.querySelectorAll('.card');
const emojis = document.querySelectorAll('.emoji');
const front = document.querySelectorAll('.back_card');

//массив, в котором будут хранится выбранные карты
let pickArr = []

function anima_cards(target) {
    if (pickArr.length < 2) {
        target.children[0].classList.add('anima_front');
        target.children[1].classList.add('anima_back');
        pickArr.push(target)
    }
    if (pickArr.length == 2) {
        //запускаем проверку на совпадение с некоторой задержкой, т.к. дом дерево надо перерисовать.
        setTimeout(checker, 500)
    }
}

//проверяет совпадение, подствечивает плейсхолдер.
const checker = () => {
    let color = pickArr[0].querySelector('.emoji').textContent == pickArr[1].querySelector('.emoji').textContent ? 'success' : 'fail';
    pickArr.forEach((item) => {
        item.querySelector('.card_placeholder').classList.toggle(color)
    })
    //оканчиваем ход
    setTimeout(finisher, 500, color)
}

//заканчивает ход - отключает плейсхолдер, поворачивает обратно карты, если не угадал.
const finisher = (color) => {
    pickArr.forEach((item) => {
        item.querySelector('.card_placeholder').classList.toggle(color);
        if (color == 'fail') {
            item.children[0].classList.toggle('anima_front');
            item.children[1].classList.toggle('anima_back');
        }
    })
    pickArr = pickArr.slice(-1, 0)
}

rotate.forEach((card) => card.addEventListener('click', ({
    currentTarget
}) => {
    //Если необходимо, здесь вы можете передавать индексы в anima_cards, 
    //т.к. каллбек ф-я forEach вторым аргументом принимает индекс элемента, который можно пробросить дальше
    anima_cards(currentTarget)
}));

function randomCard() {
    emojis.forEach((elem => {
        let max = emoji.length;
        let index = getRandom(0, max);
        elem.textContent = emoji[index];
        emoji.splice(index, 1);
    }));
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

randomCard();