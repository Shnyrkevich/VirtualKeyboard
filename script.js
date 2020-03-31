//Получаем доступ к head, создаем link закидываем ссылку на стили
const head = document.getElementsByTagName('head')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
head.appendChild(link);

const body = document.getElementsByTagName('body')[0];

//Окошко ввода через form и textarea
const form = document.createElement('form');
const textarea = document.createElement('textarea');
form.className = 'document-form';
textarea.className = 'document-textarea';
//textarea.disabled = 'disabled'; 
textarea.contentEditable = 'true';
body.appendChild(form);
form.appendChild(textarea);

//Cоздаем тело клавы закидываем
const keyboardBody = document.createElement('div');
keyboardBody.className = 'keyboard-body';
body.appendChild(keyboardBody);

//Попытка 2 кнопка из массива
function createButton(el, code) {
    let  buttonKeybord = document.createElement('input');
    buttonKeybord.className = 'keybord-body__button';
    if(code == 'Space'){
        buttonKeybord.classList.add('space');
    } else if( el == 'Shift' || el == 'Delete') {
        buttonKeybord.classList.add('tool');
    } else if(el == 'Backspace' || el == 'CapsLock' || el == 'Enter'){ 
        buttonKeybord.classList.add('tool-back');
    } else if (el == '↑'){
        buttonKeybord.classList.add('arrow');
    }
    buttonKeybord.type = 'button';
    buttonKeybord.value = el;
    buttonKeybord.name = code;
    return keyboardBody.appendChild(buttonKeybord);
}

function createBoard(mas){
    for(let i = 0; i < mas.length; i++){
        createButton(mas[i], keyboardCodes[i]);
     }
}

//массив русских раскладки
const russianLowerCase = ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                        'Tab','й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',"/", 'Delete',
                        'CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter',
                        'Shift','я','ч','с','м','и','т','ь','б','ю','.','Shift','↑',
                        'Ctrl','Alt',' ','Alt','Ctrl','←','↓', '→'
                        ];

//массив Латинской раскладки
const englishLowerCase = ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                        'Tab','q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',`\ `, 'Delete',
                        'CapsLock','a','s','d','f','g','h','j','k','l',';', "'",'Enter',
                        'Shift','z','x','c','v','b','n','m',',','.','/','Shift','↑',
                        'Ctrl','Alt',' ','Alt','Ctrl','←','↓', '→'
                        ];

//Shift russian
const russianShiftLowerCase = ['Ё','!','"','№',';','%',':','?','*','(',')','_','+','Backspace',
                        'Tab','Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',`/`, 'Delete',
                        'CapsLock','Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э','Enter',
                        'Shift','Я','Ч','С','М','И','Т','Ь','Б','Ю',',','Shift','↑',
                        'Ctrl','Alt',' ','Alt','Ctrl','←','↓', '→'
                        ];

//Shift English
const englishShiftLowerCase = ['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace',
                        'Tab','Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']',`/`, 'Delete',
                        'CapsLock','A','S','D','F','G','H','J','K','L',':', '"','Enter',
                        'Shift','Z','X','C','V','B','N','M','<','>','?','Shift','↑',
                        'Ctrl','Alt',' ','Alt','Ctrl','←','↓', '→'
                        ];



//Массив кодов кнопок клавиатуры
const keyboardCodes = ['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace',
                    'Tab','KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight','Backslash', 'Delete',
                    'CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter',
                    'ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight','ArrowUp',//zatup
                    'ControlLeft','AltLeft','Space','AltRight','ControlRight','ArrowLeft','ArrowDown','ArrowRight'
                ];

//формитрование кнопок в keybord-body
let langStatus = localStorage.value || 'rus';

if(langStatus == 'rus'){
    createBoard(russianLowerCase);
} else {
    createBoard(englishLowerCase);
}

//Получение коллекции кнопок
const buttonMas = document.querySelectorAll('.keybord-body__button');

//Блок локальных переменных для управляющих кнопок 
let reg = /^Key/i;
let regArrow = /^Arrow/i; 
let capsClick = false;

function swapValues(buttonMas, mas){
    for(let i = 0; i < mas.length; i++){
        if(buttonMas[i].value != mas[i]){
            buttonMas[i].value = mas[i];
        }
    }
}

function arrowAction(code){
    switch(code){ 
        case 'ArrowLeft' || '←':
            if(textarea.selectionEnd >= 0){
                textarea.selectionEnd -= 1;
            }
        break;
        case 'ArrowRight' || '':
            if(textarea.selectionEnd <= textarea.value.length){
                textarea.selectionStart += 1; 
            } 
        break;
        case 'ArrowDown' || '':
            for(let i = textarea.selectionEnd; i <= textarea.value.length; i++){
                if(textarea.value[i] == '\n'){
                    console.log(i);
                    textarea.selectionStart = i+1;
                    break;
                }
            }
        break;
        case 'ArrowUp' || '':
            for(let i = textarea.selectionEnd; i >= 0; i--){
                if(textarea.value[i] == '\n'){
                    console.log(i);
                    textarea.selectionEnd = i;
                    break;
                }
            } 
        break;
    }
}

function capsAction(){
    if(capsClick == false) {
        capsClick = true;
        buttonMas.forEach(el => {
            if(reg.test(el.name) || el.name == 'BracketLeft'
             || el.name == 'BracketRight' || el.name == 'Backquote'
              || el.name == 'Semicolon' || el.name =='Quote'  
              || el.name == 'Comma' || el.name == 'Period' || el.name == 'Slash' && langStatus == false){
                el.classList.add('active-caps');
            } else if(reg.test(el.name) && langStatus) {
                el.classList.add('active-caps');
            } 
        });
    } else {
        capsClick = false; 
        buttonMas.forEach(el => {
            if(el.classList.contains('active-caps')){
                el.classList.remove('active-caps');
            } 
        });
    }
}

function action(el, event){
    if(event.altKey && event.shiftKey){ //Чекаем язык на нажатия alt с shift
        if(langStatus == 'rus'){
            langStatus = 'eng';
            swapValues(buttonMas, englishLowerCase);
        } else {
            langStatus = 'rus';
            swapValues(buttonMas, russianLowerCase);
        }
        localStorage.value = langStatus;
    } else if( event.code == 'CapsLock'){ // Если CAPS активен навешиваем на кнопки обычные класс с uppercase
        capsAction();
    } else if(event.code == 'Tab'){ // Реализация Tab два пробела
        textarea.value += '  '; 
    } else if(event.shiftKey){
        if(langStatus == 'rus'){ // нажатие shift Показ спецсимволов и уперкейса символов
            swapValues(buttonMas, russianShiftLowerCase);
        } else {
            swapValues(buttonMas, englishShiftLowerCase);
        }
        if(el.value != 'Shift' ){
            textarea.value += el.value;
        }
    } else if(event.altKey || event.ctrlKey || event.key == 'AltGraph'){ // Дефолтное действие на отдельно нажатые кнопки типа Alt или Ctrl
        textarea.value += '';
    } else if(event.code == 'Backspace'){ // Реализация Backpace
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd , 'end');
        if(textarea.selectionStart == textarea.selectionEnd){
            textarea.setRangeText('', textarea.selectionStart-1, textarea.selectionEnd , 'end');
        }
    } else if(event.code == 'Delete'){ // Реализация Delete условия ловит ошибку пока не придумал что на нее посавить
        textarea.setRangeText('', textarea.selectionEnd, textarea.selectionStart, 'end');
        if(textarea.selectionStart == textarea.selectionEnd){
            textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd+1, 'end');
        }
    } else if( event.code == 'Enter'){ // Пепевод корретки на новую строку при нажатии "ENTER"
        textarea.value += '\n';
    } else if( regArrow.test(event.code)) { // Нажатие стрелок: перенос коретки
        arrowAction(event.code);
    } else if (capsClick) { // Славянское добавление символа
        textarea.value += el.value.toUpperCase();
    } else {
        textarea.value += el.value;
    }
}

function actionMouse(el){
    if( el.value == 'CapsLock'){ // Если CAPS активен навешиваем на кнопки обычные класс с uppercase
        capsAction();
    } else if(el.value == 'Tab'){ // Реализация Tab два пробела
        textarea.value += '  '; 
    } else if(el.value == 'Alt' || el.value == 'Shift' || el.value == 'Ctrl' || 
            el.value == '←' || el.value == '↑' ||  el.value == '↓' || el.value == '→'){ // Дефолтное действие на отдельно нажатые кнопки типа Alt или Ctrl
        textarea.value += '';
    } else if(el.value == 'Backspace'){ // Реализация Backpace
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd , 'end');
        if(textarea.selectionStart == textarea.selectionEnd){
            textarea.setRangeText('', textarea.selectionStart-1, textarea.selectionEnd , 'end');
        }
    } else if(el.value == 'Delete'){ // Реализация Delete условия ловит ошибку пока не придумал что на нее посавить
        textarea.setRangeText('', textarea.selectionEnd, textarea.selectionStart, 'end');
        if(textarea.selectionStart == textarea.selectionEnd){
            textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd+1, 'end');
        }
    } else if(el.value == 'Enter'){ // Пепевод корретки на новую строку при нажатии "ENTER"
        textarea.value += '\n';
    } else if(capsClick) { // Славянское добавление символа
        textarea.value += el.value.toUpperCase();
    } else {
        textarea.value += el.value;
    }
}

//Добавление кнопкам Действия на клик
document.addEventListener('mousedown', (event) => {
    buttonMas.forEach((el) => {
        if(el.value == event.target.value){
            el.classList.add('active-button');
            actionMouse(el, event);
        }  
    });
});

document.addEventListener('mouseup', () => {
    buttonMas.forEach((el) => {
            el.classList.remove('active-button');
    });  
});

document.addEventListener('keydown', (event) => { //Слушаю нажатие, функция выбирает действие
    //Добавление анимации нажатия
    event.preventDefault();
    buttonMas.forEach((el) => {
        if(el.name == event.code){
            el.classList.add('active-button');
            action(el, event);
        }  
    });
});

document.addEventListener('keyup', (event) => { // Слушаю отпуск кнопки убираю Active, а также слежу за Shift
    buttonMas.forEach(el => {
        if(el.value == 'Shift'){
            if(langStatus == 'rus'){
                swapValues(buttonMas, russianLowerCase);
            } else {
                swapValues(buttonMas, englishLowerCase);
            }
        }
        el.classList.remove('active-button')
    });
});
