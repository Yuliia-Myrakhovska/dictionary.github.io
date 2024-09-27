document.addEventListener("DOMContentLoaded", function() {
    const selectedTheme = localStorage.getItem('selectedTheme');

    if (selectedTheme) {
        document.getElementById('theme-title').innerText = selectedTheme;
        loadWords(selectedTheme);
    } else {
        document.getElementById('theme-title').innerText = "Тема не выбрана";
    }
});

let words = [];
let currentWordIndex = 0;

async function loadWords(selectedTheme) {
    try {
        const response = await fetch('../word.json');
        const data = await response.json();

        const theme = data.themes.find(theme => theme.name === selectedTheme);
        if (theme) {
            words = theme.words; 
            if (words.length > 0) {
                displayWord(currentWordIndex);
            } else {
                document.getElementById('word-card').innerText = "Слова не найдены для этой темы.";
            }
        } else {
            document.getElementById('word-card').innerText = "Тема не найдена.";
        }
    } catch (error) {
        console.error('Ошибка при загрузке слов:', error);
    }
}

function displayWord(index) {
    const word = words[index];

    const wordCard = document.getElementById('word-card');
    wordCard.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <div class="img-cart"><img src="${word.image}" alt="${word.word}" id="word-image"></div>
                <p class="name-cart" id="word-name">${word.translation}</p>
                <i class="bi bi-arrow-bar-down" id="toggle-pronunciation-icon"></i> <!-- Изначально иконка вниз -->
                <p class="pronunciation" id="word-pronunciation" style="display: none;">${word.pronunciation}</p> <!-- Изначально скрыто -->
                <div class="text-cart" id="word-description">${word.description_translation}</div>
            </div>
            <div class="card-back">
                <div class="img-cart"><img src="${word.image}" alt="${word.word}" id="word-image"></div>
                <p class="translation" id="word-translation">${word.word}</p>
                <p class="back-description">${word.description}</p>
            </div>
        </div>
    `;

    const cardInner = wordCard.querySelector('.card-inner');
    cardInner.addEventListener('click', () => {
        cardInner.classList.toggle('flipped');
    });

    const togglePronunciationIcon = document.getElementById('toggle-pronunciation-icon');
    const pronunciation = document.getElementById('word-pronunciation');
    
    togglePronunciationIcon.addEventListener('click', (event) => {
        event.stopPropagation(); 

        if (pronunciation.style.display === 'none') {
            pronunciation.style.display = 'block';
            togglePronunciationIcon.classList.remove('bi-arrow-bar-down');
            togglePronunciationIcon.classList.add('bi-arrow-bar-up'); // Меняем иконку на стрелку вверх
        } else {
            pronunciation.style.display = 'none';
            togglePronunciationIcon.classList.remove('bi-arrow-bar-up');
            togglePronunciationIcon.classList.add('bi-arrow-bar-down'); // Меняем иконку обратно на стрелку вниз
        }
    });
}

const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

nextButton.addEventListener('click', () => {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        displayWord(currentWordIndex);
        updateButtonStates(); 
    }
});

prevButton.addEventListener('click', () => {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        displayWord(currentWordIndex);
        updateButtonStates(); 
    }
});

function updateButtonStates() {
    if (currentWordIndex === 0) {
        prevButton.classList.add('disabled'); 
    } else {
        prevButton.classList.remove('disabled'); 
    }

    if (currentWordIndex === words.length - 1) {
        nextButton.classList.add('disabled'); 
    } else {
        nextButton.classList.remove('disabled'); 
    }
}

updateButtonStates();
