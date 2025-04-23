document.addEventListener('DOMContentLoaded', function() {
    loadPage('home');
    window.addEventListener('popstate', function() {
        const page = window.location.hash.substr(1) || 'home';
        loadPage(page);
    });
});

function loadPage(page) {
    const app = document.getElementById('app');
    
    switch(page) {
        case 'home':
            app.innerHTML = `
                <div class="header">
                    <h1>Добро пожаловать в Кулинарный сборник</h1>
                </div>
                <div class="container home-page">
                    <p>Это приложение содержит коллекцию вкусных и проверенных рецептов на все случаи жизни.</p>
                    <p>От простых повседневных блюд до изысканных кулинарных шедевров - у нас есть рецепты на любой вкус!</p>
                    <button class="btn" onclick="navigateTo('recipes')">Посмотреть рецепты</button>
                </div>
            `;
            break;
            
        case 'recipes':
            app.innerHTML = `
                <div class="header">
                    <h1>Кулинарные рецепты</h1>
                </div>
                <div class="container recipes-page">
                    <button class="btn" onclick="navigateTo('home')">На главную</button>
                    
                    <div class="recipe-card">
                        <h2>Паста Карбонара</h2>
                        <h3>Ингредиенты:</h3>
                        <ul>
                            <li>Спагетти - 400 г</li>
                            <li>Гуанчиале или панчетта - 150 г</li>
                            <li>Яйца - 4 шт.</li>
                            <li>Пармезан - 50 г</li>
                            <li>Черный перец - по вкусу</li>
                            <li>Соль - по вкусу</li>
                        </ul>
                        <h3>Приготовление:</h3>
                        <ol>
                            <li>Отварите спагетти в подсоленной воде до состояния аль денте.</li>
                            <li>Обжарьте гуанчиале до хрустящей корочки.</li>
                            <li>Взбейте яйца с тертым пармезаном и черным перцем.</li>
                            <li>Смешайте горячие спагетти с гуанчиале, затем добавьте яичную смесь, быстро перемешивая.</li>
                            <li>Подавайте сразу же, посыпав дополнительным пармезаном и перцем.</li>
                        </ol>
                    </div>
                    
                    <div class="recipe-card">
                        <h2>Тирамису</h2>
                        <h3>Ингредиенты:</h3>
                        <ul>
                            <li>Сыр маскарпоне - 500 г</li>
                            <li>Яйца - 4 шт.</li>
                            <li>Сахар - 100 г</li>
                            <li>Печенье савоярди - 200 г</li>
                            <li>Кофе эспрессо - 300 мл</li>
                            <li>Какао-порошок - для посыпки</li>
                        </ul>
                        <h3>Приготовление:</h3>
                        <ol>
                            <li>Приготовьте крепкий кофе и остудите его.</li>
                            <li>Отделите желтки от белков. Желтки взбейте с сахаром до белой массы.</li>
                            <li>Добавьте маскарпоне к желткам и аккуратно перемешайте.</li>
                            <li>Взбейте белки в крепкую пену и аккуратно вмешайте в сырную массу.</li>
                            <li>Обмакивайте печенье в кофе и выкладывайте в форму слоями, чередуя с кремом.</li>
                            <li>Посыпьте какао и охлаждайте в холодильнике не менее 6 часов.</li>
                        </ol>
                    </div>
                </div>
            `;
            break;
    }
}

function navigateTo(page) {
    // Изменяем URL без перезагрузки страницы
    window.history.pushState(null, null, `#${page}`);
    loadPage(page);
}