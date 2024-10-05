let usedWords = [];

function getRandomWord() {
    const allWords = themes.flatMap(theme => theme.words); 
    let availableWords = allWords.filter(word => !usedWords.includes(word)); 

    if (availableWords.length === 0) { 
        usedWords = [];
        availableWords = allWords;
    }

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.push(randomWord); 
    return randomWord;
}

function updateCard() {
    const card = document.getElementById('word-card');
    const wordData = getRandomWord();
    card.innerHTML = `
        <img src="${wordData.image}" alt="${wordData.word}">
    `;
}

updateCard();

document.getElementById('prev-button').addEventListener('click', updateCard);
