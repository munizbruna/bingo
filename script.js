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


    const startBingo = () => {
        welcome.style.display = 'none';
        executando.style.display = 'flex';

    };

    start.addEventListener('click', startBingo)


    let secondaryList = JSON.parse(localStorage.getItem('secondaryList')) || [];
    const reinicia = () => {
        localStorage.removeItem('secondaryList');
        localStorage.removeItem('currentValue');
        location.reload();

    }
    reset.addEventListener('click', reinicia);
    const insertValue = () => {
        container.style.display = 'flex';
        const newValue = valueInputElement.value.trim();

        // Verificação do comprimento da string
        if (newValue.length > 3) {
            alert('Verifique o valor inserido. Limite de 3 digitos');
            return; // Interrompe a execução da função se o valor for maior que 3 caracteres
        }

        if (newValue) {
            if (currentValueElement.textContent) {
                secondaryList.push(currentValueElement.textContent);
                updateSecondaryList();
                saveToLocalStorage();
            }
            currentValueElement.textContent = newValue;
            valueInputElement.value = '';
        }
    };


    const updateSecondaryList = () => {
        sorteadosElement.style.display = 'flex';
        secondaryListElement.innerHTML = secondaryList.slice(-6).map(value => `<div class="numero">${value}</div>`).join('');
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

    // Carregar o valor atual do localStorage
    const savedCurrentValue = localStorage.getItem('currentValue');
    if (savedCurrentValue) {
        currentValueElement.textContent = savedCurrentValue;
    }

    // Atualizar a lista secundária ao carregar a página
    if (secondaryList.length > 0) {
        updateSecondaryList();
    }

    // Salvar o valor atual no localStorage quando ele mudar
    const observer = new MutationObserver(() => {
        localStorage.setItem('currentValue', currentValueElement.textContent);
    });
    observer.observe(currentValueElement, { childList: true });
});

/* 
}
 */