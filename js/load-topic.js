async function loadThemes() {
    try {
        const response = await fetch('../word.json'); 
        const data = await response.json();
        displayThemes(data.themes);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

function displayThemes(themes) {
    const wrapper = document.getElementById('wrapper-cart');
    themes.forEach(theme => {
        const themeLink = document.createElement('a');
        themeLink.className = 'cart';
        
        themeLink.href = "../word.html"; 
        themeLink.innerText = theme.name;

        themeLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.setItem('selectedTheme', theme.name); 
            window.location.href = themeLink.href; 
        });

        wrapper.appendChild(themeLink);
    });
}

loadThemes();
