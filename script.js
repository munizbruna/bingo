document.addEventListener('DOMContentLoaded', () => {
    const currentValueElement = document.getElementById('current-value');
    const valueInputElement = document.getElementById('value-input');
    const insertButton = document.getElementById('insert-button');
    const secondaryListElement = document.getElementById('secondary-list');
    const sorteadosElement = document.getElementById('sorteados');
    const reset = document.getElementById('reset')
    const start = document.getElementById('start')
    const welcome = document.getElementById('welcome')
    const executando = document.getElementById('executando')
    const container = document.getElementById('container')
    const input = document.getElementById('input')
    const numbersContainer = document.getElementById('numbers-container')
    const geral = document.getElementById('geral')
    const fechar = document.getElementById('fechar')

    const startBingo = () => {
        welcome.style.display = 'none';
        executando.style.display = 'flex';
    };

    start.addEventListener('click', startBingo);

    let secondaryList = JSON.parse(localStorage.getItem('secondaryList')) || [];

    const reinicia = () => {
        localStorage.removeItem('secondaryList');
        localStorage.removeItem('currentValue');
        location.reload();
    };
    reset.addEventListener('click', reinicia);

    const getCategory = (value) => {
        if (value <= 15) return 'B';
        if (value <= 30) return 'I';
        if (value <= 45) return 'N';
        if (value <= 60) return 'G';
        return 'O';
    };

    const insertValue = () => {
        container.style.display = 'flex';
        const newValue = parseInt(valueInputElement.value.trim(), 10);

        if (isNaN(newValue) || newValue < 1 || newValue > 75) {
            alert('Por favor, insira um número válido entre 1 e 75.');
            return;
        }

        if (newValue) {
            if (currentValueElement.textContent) {
                secondaryList.push(currentValueElement.textContent);
                updateSecondaryList();
                saveToLocalStorage();
            }
            currentValueElement.textContent = `${getCategory(newValue)} ${newValue}`;
            valueInputElement.value = '';
        }
    };

    const updateSecondaryList = () => {
        sorteadosElement.style.display = 'flex';
        secondaryListElement.innerHTML = secondaryList.slice(-3).map(value => {
            const num = parseInt(value.split(' ')[1], 10);
            return `<div class="numero">${value}</div>`;
        }).join('');
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('secondaryList', JSON.stringify(secondaryList));
    };

    insertButton.addEventListener('click', insertValue);

    valueInputElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            insertValue();
        }
    });

    const savedCurrentValue = localStorage.getItem('currentValue');
    if (savedCurrentValue) {
        currentValueElement.textContent = savedCurrentValue;
    }

    if (secondaryList.length > 0) {
        updateSecondaryList();
    }

    const observer = new MutationObserver(() => {
        localStorage.setItem('currentValue', currentValueElement.textContent);
    });
    observer.observe(currentValueElement, { childList: true });

    document.getElementById("conferir").addEventListener("click", function () {
        container.style.display = 'none';
        input.style.display = 'none';
        numbersContainer.style.display = 'flex';
        geral.style.justifyContent = 'center'
        geral.style.alignItems = 'center'
        fechar.style.display = 'block'


        const numbers = secondaryList.map(value => {
            const parts = value.split(' ');
            return { category: parts[0], number: parseInt(parts[1], 10) };
        });

        const sortedNumbers = numbers.sort((a, b) => a.number - b.number);

        const letters = ["B", "I", "N", "G", "O"];
        const numbersContainer = document.getElementById('numbersContainer');
        numbersContainer.innerHTML = '';

        letters.forEach(letter => {
            const itemsForLetter = sortedNumbers.filter(item => item.category === letter);
            if (itemsForLetter.length > 0) {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'number-box';
                numberDiv.textContent = `${letter} ${itemsForLetter[0].number}`;
                numbersContainer.appendChild(numberDiv);
            }
        });
    });
        });
