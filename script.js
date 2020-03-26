//Получаем доступ к head, создаем link закидываем ссылку на стили
const head = document.getElementsByTagName('head')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
head.appendChild(link);

const body = document.getElementsByTagName('body')[0];

//Окошка ввода через form и textarea
const form = document.createElement('form');
const textarea = document.createElement('textarea');
form.className = 'document-form';
textarea.className = 'document-textarea';
body.appendChild(form);
form.appendChild(textarea);

//Cоздаем тело клавы закидываем
const keyboardBody = document.createElement('div');
keyboardBody.className = 'keyboard-body';
body.appendChild(keyboardBody);

//Попытка 1 создать первую кнопку
/*const buttonKeybord = document.createElement('input');
buttonKeybord.className = 'keybord-body__button';
buttonKeybord.type = 'button';
buttonKeybord.value = 'lol';
keyboardBody.appendChild(buttonKeybord);*/

//Попытка 2 кнопка из массива
function createButton(el) {
    let  buttonKeybord = document.createElement('input');
    buttonKeybord.className = 'keybord-body__button';
    buttonKeybord.type = 'button';
    buttonKeybord.value = el;
    return keyboardBody.appendChild(buttonKeybord);
}

const russianLowerCase = ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                        'Tab','й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ','\ ', 'Delete',
                        'CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter',
                        'Shift','я','ч','с','м','и','т','ь','б','ю','.','/','Shift','up',
                        'Ctrl','Alt',' ','Alt','Ctrl','lef','but','rig'
                        ];

const keyboardCodes = ['Backquote',' Digit1',' Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace',
                    'Tab','KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight',' Backslash', 'Delete',
                    'CapsLock','KeyA','KeyS','KeyD',' KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter',
                    'ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight','ArrowUp','up',//zatup
                    'ControlLeft','AltLeft','Space','AltRight','ControlRight','ArrowLeft','ArrowDown','ArrowRight'
                ];

console.log(russianLowerCase.length, keyboardCodes.length);

for(let i = 0; i < russianLowerCase.length; i++){
   createButton(russianLowerCase[i]);
}

const buttonMas = document.querySelectorAll('.keybord-body__button');
console.log(buttonMas);

buttonMas.forEach((el) => {
    el.addEventListener('click', () => {
        textarea.value += el.value;
    });
});

document.addEventListener('keydown', (event) => {
    console.log(event.key, "  ", event.code);
    buttonMas.forEach((el) => {
        if(el.value == event.key){
            el.classList.add('active-button');
        }
    });
    textarea.value += event.key;
});

document.addEventListener('keyup', () => {
    buttonMas.forEach(el => el.classList.remove('active-button'));
});

